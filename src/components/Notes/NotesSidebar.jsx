// src/components/notes/NotesSidebar.jsx
import {
  Button,
  Collapse,
  List,
  Space,
  Typography,
  Divider,
  DatePicker,
  Tooltip,
  message,
  Spin,
} from "antd";
import {
  PlusOutlined,
  InboxOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { CREATE_GROUP_MUTATION, GET_GROUPS_QUERY } from "../../graphql/groups";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import AddGroupModal from "./AddGroupModal";
import { CREATE_NOTE_MUTATION, GET_NOTES_BY_GROUP } from "../../graphql/notes";
import AddNoteModal from "./AddNoteModal";

const { Panel } = Collapse;
const { Text } = Typography;

const NotesSidebar = ({ onSelectNote, filterDate, onFilterChange }) => {
  const [groups, setGroups] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempName, setTempName] = useState("");
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [loadingGroupId, setLoadingGroupId] = useState(null);

  const [createGroup, { loading: creatingGroup }] = useMutation(
    CREATE_GROUP_MUTATION
  );

  const [createNote, { loading: creatingNote }] =
    useMutation(CREATE_NOTE_MUTATION);

  const { data: groupsData, loading: loadingGroups } =
    useQuery(GET_GROUPS_QUERY);

  useEffect(() => {
    if (groupsData?.groups) {
      setGroups(
        groupsData.groups.map((g) => ({
          ...g,
          notes: [],
          loaded: false, // đánh dấu đã load notes chưa
        }))
      );
    }
  }, [groupsData]);

  const [loadNotesByGroup, { loading: loadingNotes }] = useLazyQuery(
    GET_NOTES_BY_GROUP,
    {
      onCompleted: (data) => {
        const groupId = loadingGroupId;

        setGroups((prev) =>
          prev.map((g) =>
            g.id === groupId
              ? { ...g, notes: data.notesByGroup, loaded: true }
              : g
          )
        );

        setLoadingGroupId(null);
      },
    }
  );

  const handleExpandGroup = (groupId) => {
    setExpandedGroupId(groupId);

    const group = groups.find((g) => g.id === groupId);
    if (group && !group.loaded) {
      setLoadingGroupId(groupId);
      loadNotesByGroup({
        variables: { groupId },
      });
    }
  };

  const handleAddGroup = async (name) => {
    try {
      const { data } = await createGroup({
        variables: {
          input: { name },
        },
      });

      message.success("Group created");
      setOpenAddGroup(false);

      // TODO: update state hoặc refetch groups
    } catch (err) {
      message.error("Create group failed");
    }
  };

  const handleAddNote = async ({ title, groupId }) => {
    try {
      const { data } = await createNote({
        variables: {
          input: { title, groupId },
        },
      });

      message.success("Note created");
      setOpenAddNote(false);
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? {
                ...g,
                notes: [...g.notes, data.createNote],
              }
            : g
        )
      );

      console.log("Created note:", data.createNote);

      // TODO:
      // update groups state
      // or Apollo cache
    } catch (err) {
      message.error("Create note failed");
      console.error(err);
    }
  };

  const handleDeleteGroup = (groupId) => {
    console.log("Soft delete group:", groupId);
    // TODO: soft delete group
  };

  const handleDeleteNote = (noteId) => {
    console.log("Soft delete note:", noteId);
    // TODO: soft delete note
  };

  const openTrash = () => {
    console.log("Open trash view");
    // TODO: show deleted groups/notes
  };

  return (
    <>
      {/* TOP: Groups + Notes */}
      <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text strong>📒 Groups</Text>
          <Button
            size="small"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenAddGroup(true)}
          >
            Add Group
          </Button>
        </Space>
        <Spin spinning={loadingGroups} tip="Loading groups...">
          <Collapse
            accordion
            activeKey={expandedGroupId}
            onChange={(key) => handleExpandGroup(Number(key))}
            style={{ marginTop: 16 }}
          >
            {groups.map((group) => (
              <Panel
                key={group.id}
                header={
                  <Space>
                    {editingGroupId === group.id ? (
                      <Input
                        size="small"
                        autoFocus
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={() => {
                          console.log("Rename group:", group.id, tempName);
                          setEditingGroupId(null);
                        }}
                        onPressEnter={() => {
                          console.log("Rename group:", group.id, tempName);
                          setEditingGroupId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setEditingGroupId(null);
                        }}
                      />
                    ) : (
                      <Text>{group.name}</Text>
                    )}

                    {/* Edit group */}
                    <Tooltip title="Rename group">
                      <EditOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingGroupId(group.id);
                          setTempName(group.name);
                        }}
                      />
                    </Tooltip>

                    {/* Delete group */}
                    <Tooltip title="Delete group">
                      <DeleteOutlined
                        style={{ color: "#ff4d4f" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group.id);
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                extra={
                  <Tooltip title="Add note">
                    <PlusOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroup(group);
                        setOpenAddNote(true);
                      }}
                    />
                  </Tooltip>
                }
              >
                <Spin spinning={loadingGroupId === group.id}>
                  <List
                    size="small"
                    dataSource={group.notes}
                    renderItem={(note) => (
                      <List.Item
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={() => onSelectNote(note)}
                      >
                        <Space>
                          {editingNoteId === note.id ? (
                            <Input
                              size="small"
                              autoFocus
                              value={tempName}
                              onChange={(e) => setTempName(e.target.value)}
                              onBlur={() => {
                                console.log("Rename note:", note.id, tempName);
                                setEditingNoteId(null);
                              }}
                              onPressEnter={() => {
                                console.log("Rename note:", note.id, tempName);
                                setEditingNoteId(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Escape") setEditingNoteId(null);
                              }}
                            />
                          ) : (
                            <span>📝 {note.title}</span>
                          )}
                        </Space>

                        <Space>
                          {/* Edit note */}
                          <Tooltip title="Rename note">
                            <EditOutlined
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingNoteId(note.id);
                                setTempName(note.title);
                              }}
                            />
                          </Tooltip>

                          {/* Delete note */}
                          <Tooltip title="Delete note">
                            <DeleteOutlined
                              style={{ color: "#ff7875" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNote(note.id);
                              }}
                            />
                          </Tooltip>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Spin>
              </Panel>
            ))}
          </Collapse>
        </Spin>
      </div>

      {/* FILTER */}
      <div style={{ padding: 16, borderTop: "1px solid #eee" }}>
        <Text strong>🔍 Filter notes</Text>
        <Divider style={{ margin: "8px 0" }} />

        <Space direction="vertical" style={{ width: "100%" }}>
          <DatePicker
            placeholder="Filter by date"
            style={{ width: "100%" }}
            value={filterDate}
            onChange={onFilterChange}
          />

          <DatePicker
            picker="month"
            placeholder="Filter by month"
            style={{ width: "100%" }}
            onChange={onFilterChange}
          />

          <DatePicker
            picker="year"
            placeholder="Filter by year"
            style={{ width: "100%" }}
            onChange={onFilterChange}
          />

          <Button onClick={() => onFilterChange(null)} danger size="small">
            Clear filter
          </Button>
        </Space>
      </div>

      {/* TRASH */}
      <div style={{ padding: "8px 16px", borderTop: "1px solid #eee" }}>
        <Button
          type="text"
          danger
          icon={<InboxOutlined />}
          block
          onClick={openTrash}
        >
          Trash
        </Button>
      </div>

      <AddGroupModal
        open={openAddGroup}
        onCancel={() => setOpenAddGroup(false)}
        onAddGroup={handleAddGroup}
      />
      <AddNoteModal
        open={openAddNote}
        group={selectedGroup}
        onCancel={() => setOpenAddNote(false)}
        onAddNote={handleAddNote}
      />
    </>
  );
};

export default NotesSidebar;
