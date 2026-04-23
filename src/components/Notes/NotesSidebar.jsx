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
  Spin
} from 'antd'
import {
  PlusOutlined,
  InboxOutlined,
  EditOutlined,
  DeleteOutlined,
  DeleteFilled,
  ShareAltOutlined
} from '@ant-design/icons'
import './NotesSidebar.css'
import { useEffect, useState } from 'react'
import { Input } from 'antd'
import {
  CREATE_GROUP_MUTATION,
  GET_GROUPS_QUERY,
  UPDATE_GROUP_MUTATION,
  SHARE_GROUP_MUTATION
} from '../../graphql/groups'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import AddGroupModal from './AddGroupModal'
import ShareGroupModal from './ShareGroupModal'
import {
  CREATE_NOTE_MUTATION,
  GET_NOTES_BY_GROUP,
  SHARE_NOTE_MUTATION,
  UPDATE_NOTE_MUTATION
} from '../../graphql/notes'
import AddNoteModal from './AddNoteModal'
import TrashModal from './TrashModal'
import './NotesSidebar.css'
import ShareNoteModal from './ShareNoteModal'
const { Panel } = Collapse
const { Text } = Typography

const NotesSidebar = ({ onSelectNote, filterDate, onFilterChange }) => {
  const [groups, setGroups] = useState([])
  const [editingGroupId, setEditingGroupId] = useState(null)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [tempName, setTempName] = useState('')
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [openAddNote, setOpenAddNote] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [expandedGroupId, setExpandedGroupId] = useState(null)
  const [loadingGroupId, setLoadingGroupId] = useState(null)
  const [openTrashModal, setOpenTrashModal] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [shareNoteId, setShareNoteId] = useState(null)
  const [shareGroupModalOpen, setShareGroupModalOpen] = useState(false)
  const [shareGroupId, setShareGroupId] = useState(null)


  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION)
  const [updateGroup] = useMutation(UPDATE_GROUP_MUTATION, {
    refetchQueries: [GET_GROUPS_QUERY] // reload
  })
  const [createGroup, { loading: creatingGroup }] = useMutation(
    CREATE_GROUP_MUTATION,
    {
      refetchQueries: [GET_GROUPS_QUERY] // reload
    }
  )

  const [createNote, { loading: creatingNote }] =
    useMutation(CREATE_NOTE_MUTATION)

  const { data: groupsData, loading: loadingGroups } =
    useQuery(GET_GROUPS_QUERY)

  const [shareNote, { loading: sharing }] = useMutation(SHARE_NOTE_MUTATION);

  useEffect(() => {
    if (groupsData?.groups) {
      setGroups(
        groupsData.groups.map((g) => ({
          ...g,
          notes: [],
          loaded: false // đánh dấu đã load notes chưa
        }))
      )
    }
  }, [groupsData])

  const [loadNotesByGroup, { loading: loadingNotes }] = useLazyQuery(
    GET_NOTES_BY_GROUP,
    {
      onCompleted: (data) => {
        const groupId = loadingGroupId

        setGroups((prev) =>
          prev.map((g) =>
            g.id === groupId
              ? { ...g, notes: data.notesByGroup, loaded: true }
              : g
          )
        )

        setLoadingGroupId(null)
      }
    }
  )

  const handleExpandGroup = (groupId) => {
    setExpandedGroupId(groupId)

    const group = groups.find((g) => g.id === groupId)
    if (group && !group.loaded) {
      setLoadingGroupId(groupId)
      loadNotesByGroup({
        variables: { groupId }
      })
    }
  }

  const handleAddGroup = async (name) => {
    try {
      const { data } = await createGroup({
        variables: {
          input: { name }
        }
      })

      message.success('Tạo nhóm thành công')
      setOpenAddGroup(false)

      // TODO: update state hoặc refetch groups
    } catch (err) {
      message.error('Tạo nhóm thất bại')
    }
  }

  const handleAddNote = async ({ title, groupId }) => {
    try {
      const { data } = await createNote({
        variables: {
          input: { title, groupId }
        }
      })

      message.success('Tạo ghi chú thành công')
      setOpenAddNote(false)
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? {
                ...g,
                notes: [...g.notes, data.createNote]
              }
            : g
        )
      )

      console.log('Created note:', data.createNote)

      // TODO:
      // update groups state
      // or Apollo cache
    } catch (err) {
      message.error('Tạo ghi chú thất bại')
      console.error(err)
    }
  }

  const handleRenameNote = async (noteId) => {
    if (!tempName.trim()) {
      message.warning('Tiêu đề ghi chú không được để trống')
      return
    }

    try {
      await updateNote({
        variables: {
          input: {
            id: noteId,
            title: tempName.trim()
          }
        }
      })

      // ✅ UPDATE LOCAL STATE
      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          notes: g.notes.map((n) =>
            n.id === noteId ? { ...n, title: tempName.trim() } : n
          )
        }))
      )

      message.success('Sửa tên ghi chú thành công ✏️')
    } catch (err) {
      console.error(err)
      message.error('Sửa tên ghi chú thất bại')
    } finally {
      setEditingNoteId(null)
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await updateNote({
        variables: {
          input: {
            id: noteId,
            isDeleted: true
          }
        }
      })

      // ✅ UPDATE LOCAL STATE
      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          notes: g.notes.map((n) =>
            n.id === noteId ? { ...n, isDeleted: true } : n
          )
        }))
      )

      message.success('Xoá ghi chú thành công 🗑')
    } catch (err) {
      console.error(err)
      message.error('Xoá ghi chú thất bại')
    }
  }

  const handleDeleteGroup = async (groupId) => {
    try {
      await updateGroup({
        variables: {
          input: {
            id: groupId,
            isDeleted: true
          }
        }
      })

      // ✅ UPDATE LOCAL STATE
      setGroups((prev) =>
        prev.map((g) => (g.id === groupId ? { ...g, isDeleted: true } : g))
      )

      message.success('Xoá nhóm thành công 🗑')
    } catch (err) {
      console.error(err)
      message.error('Đã có lỗi xảy ra khi xoá nhóm')
    }
  }

  const handleRenameGroup = async (groupId) => {
    if (!tempName.trim()) {
      message.warning('Tên nhóm không được để trống')
      return
    }

    try {
      await updateGroup({
        variables: {
          input: {
            id: groupId,
            name: tempName.trim()
          }
        }
      })

      // ✅ UPDATE LOCAL STATE
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId ? { ...g, name: tempName.trim() } : g
        )
      )

      message.success('Sửa tên nhóm thành công ✏️')
    } catch (err) {
      console.error(err)
      message.error('Sửa tên nhóm thất bại')
    } finally {
      setEditingGroupId(null)
    }
  }

  return (
    <>
      {/* TOP: Groups + Notes */}
      <div className="notes-sidebar-wrapper">
        {/* Header */}
        <Space className="notes-sidebar-header">
          <Text strong>
            {' '}
            <a href="/">Trang chủ /</a> 📒 Nhóm
          </Text>
          <Button
            size="small"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenAddGroup(true)}
          >
            Thêm
          </Button>
        </Space>
        <Spin spinning={loadingGroups} tip="Đang tải...">
          <Collapse
            accordion
            activeKey={expandedGroupId}
            onChange={(key) => handleExpandGroup(Number(key))}
            className="notes-group-panel"
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
                        onBlur={() => handleRenameGroup(group.id)} // 👈 auto save
                        onPressEnter={() => handleRenameGroup(group.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setEditingGroupId(null)
                            setTempName(group.name)
                          }
                        }}
                      />
                    ) : (
                      <Text>{group.name}</Text>
                    )}

                    {/* Edit group */}
                    <Tooltip title="Sửa tên nhóm">
                      <EditOutlined
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingGroupId(group.id)
                          setTempName(group.name)
                        }}
                      />
                    </Tooltip>

                    {/* Delete group */}
                    <Tooltip title="Xoá nhóm">
                      <DeleteFilled
                        style={{ color: '#ff4d4f' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteGroup(group.id)
                        }}
                      />
                    </Tooltip>

                    {/* Share group */}
                    <Tooltip title="Chia sẻ nhóm">
                      <ShareAltOutlined
                        onClick={(e) => {
                          e.stopPropagation()
                          setShareGroupId(group.id)
                          setShareGroupModalOpen(true)
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                extra={
                  <Tooltip title="Thêm ghi chú">
                    <PlusOutlined
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedGroup(group)
                        setOpenAddNote(true)
                      }}
                    />
                  </Tooltip>
                }
              >
                <Spin spinning={loadingGroupId === group.id}>
                  <List
                    size="small"
                    dataSource={group.notes.filter((n) => !n.isDeleted)}
                    renderItem={(note) => (
                      <List.Item
                        className={
                          selectedNoteId === note.id ? 'note-active' : ''
                        }
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedNoteId(note.id)
                          onSelectNote(note)
                        }}
                      >
                        <Space>
                          {editingNoteId === note.id ? (
                            <Input
                              size="small"
                              autoFocus
                              value={tempName}
                              onChange={(e) => setTempName(e.target.value)}
                              onBlur={() => handleRenameNote(note.id)} // 👈 auto save
                              onPressEnter={() => handleRenameNote(note.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                  setEditingNoteId(null)
                                  setTempName(note.title)
                                }
                              }}
                            />
                          ) : (
                            <span>📝 {note.title}</span>
                          )}
                        </Space>

                        <Space>
                          {/* Rename */}
                          <Tooltip title="Sửa tên ghi chú">
                            <EditOutlined
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingNoteId(note.id)
                                setTempName(note.title)
                              }}
                            />
                          </Tooltip>

                          {/* Delete */}
                          <Tooltip title="Xoá ghi chú">
                            <DeleteFilled
                              style={{ color: '#ff7875' }}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteNote(note.id)
                              }}
                            />
                          </Tooltip>

                          {/* Share */}
                          <Tooltip title="Chia sẻ ghi chú">
                            <ShareAltOutlined
                              onClick={(e) => {
                                e.stopPropagation()
                                setShareNoteId(note.id)
                                setShareModalOpen(true)
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
      {/* <div style={{ padding: 16, borderTop: "1px solid #eee" }}>
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
      </div> */}

      {/* TRASH */}
      <div className="trash-button">
        <Button
          type="text"
          danger
          icon={<DeleteFilled />}
          block
          onClick={() => setOpenTrashModal(true)}
        >
          Thùng rác
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
      <TrashModal
        open={openTrashModal}
        onClose={() => setOpenTrashModal(false)}
      />
      <ShareNoteModal
        open={shareModalOpen}
        noteId={shareNoteId}
        onClose={() => {
          setShareModalOpen(false)
          setShareNoteId(null)
        }}
      />
      <ShareGroupModal
        open={shareGroupModalOpen}
        groupId={shareGroupId}
        onClose={() => {
          setShareGroupModalOpen(false)
          setShareGroupId(null)
        }}
      />
    </>
  )
}

export default NotesSidebar
