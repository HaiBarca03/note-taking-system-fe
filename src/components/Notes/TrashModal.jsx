import { Modal, List, Space, Button, Typography, Spin, message } from "antd";
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  GET_GROUPS_QUERY_TRASK,
  REMOVE_GROUP_MUTATION,
  UPDATE_GROUP_MUTATION,
} from "../../graphql/groups";
import { GET_NOTES_BY_GROUP } from "../../graphql/notes";

const { Text } = Typography;

const TrashModal = ({ open, onClose }) => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const { data, loading } = useQuery(GET_GROUPS_QUERY_TRASK);

  const [loadNotes, { data: notesData, loading: loadingNotes }] =
    useLazyQuery(GET_NOTES_BY_GROUP);
  console.log("notesData", notesData);
  const [updateGroup] = useMutation(UPDATE_GROUP_MUTATION, {
    refetchQueries: [GET_GROUPS_QUERY_TRASK], // reload trash
  });
  const [removeGroup] = useMutation(REMOVE_GROUP_MUTATION, {
    refetchQueries: [GET_GROUPS_QUERY_TRASK], // reload trash
  });

  const deletedGroups = data?.groups?.filter((g) => g.isDeleted) || [];

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);
    loadNotes({ variables: { groupId } });
  };

  const handleRestoreGroup = async (groupId) => {
    try {
      await updateGroup({
        variables: {
          input: {
            id: groupId,
            isDeleted: false,
          },
        },
      });

      message.success("Group restored ♻️");
    } catch (err) {
      console.error(err);
      message.error("Restore failed");
    }
  };

  const handleDeleteGroupForever = async (groupId) => {
    Modal.confirm({
      title: "Xoá vĩnh viễn?",
      content: "Group và toàn bộ ghi chú bên trong sẽ bị xoá vĩnh viễn!",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await removeGroup({
            variables: { id: groupId },
          });

          message.success("Đã xoá vĩnh viễn 🗑");
        } catch (err) {
          console.error(err);
          message.error("Xoá thất bại");
        }
      },
    });
  };

  return (
    <Modal
      title="🗑 Thùng rác"
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Spin spinning={loading}>
        <Space align="start" style={{ width: "100%" }}>
          {/* LEFT: GROUPS */}
          <div>
            <Text strong>Nhóm đã xoá</Text>

            <List
              size="small"
              dataSource={deletedGroups}
              renderItem={(group) => (
                <List.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectGroup(group.id)}
                  actions={[
                    <Button
                      size="small"
                      icon={<RollbackOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestoreGroup(group.id);
                      }}
                    >
                      Restore
                    </Button>,
                    <Button
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGroupForever(group.id);
                      }}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  📁 {group.name}
                </List.Item>
              )}
            />
          </div>

          {/* RIGHT: NOTES */}
          <div>
            <Text strong>Ghi chú đã xoá</Text>

            <Spin spinning={loadingNotes}>
              <List
                size="small"
                dataSource={notesData?.notesByGroup || []}
                renderItem={(note) => (
                  <List.Item
                  // actions={[
                  //   <Button size="small" icon={<RollbackOutlined />}>
                  //     Restore
                  //   </Button>,
                  //   <Button danger size="small" icon={<DeleteOutlined />}>
                  //     Delete
                  //   </Button>,
                  // ]}
                  >
                    📝 {note.title}
                  </List.Item>
                )}
              />
            </Spin>
          </div>
        </Space>
      </Spin>
    </Modal>
  );
};

export default TrashModal;
