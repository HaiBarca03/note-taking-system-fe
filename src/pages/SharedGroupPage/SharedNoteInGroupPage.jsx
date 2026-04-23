import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Typography, Space, Spin, Breadcrumb, Button, message } from 'antd'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { GET_SHARED_NOTE_IN_GROUP_QUERY, GROUP_SHARE_PERMISSION_QUERY, UPDATE_NOTE_IN_SHARED_GROUP_MUTATION } from '../../graphql/groups'
import './SharedGroupPage.css'
import FloatingCalendar from '../../components/Calendar/FloatingCalendar'
import { useEffect, useState } from 'react'

const { Title } = Typography

const SharedNoteInGroupPage = () => {
  const { token, noteId } = useParams()
  const [content, setContent] = useState('')

  const { data, loading, error } = useQuery(GET_SHARED_NOTE_IN_GROUP_QUERY, {
    variables: { token, noteId: parseInt(noteId) }
  })

  const { data: permissionData } = useQuery(GROUP_SHARE_PERMISSION_QUERY, {
    variables: { token }
  })

  const [updateNote, { loading: saving }] = useMutation(UPDATE_NOTE_IN_SHARED_GROUP_MUTATION)

  useEffect(() => {
    if (data?.sharedNoteInGroup) {
      setContent(data.sharedNoteInGroup.content || '')
    }
  }, [data])

  const handleSave = async () => {
    try {
      await updateNote({
        variables: {
          token,
          noteId: parseInt(noteId),
          content
        }
      })
      message.success('Đã lưu ghi chú')
    } catch (err) {
      message.error('Lỗi khi lưu ghi chú')
    }
  }

  if (loading)
    return (
      <div className="shared-group-loading">
        <Spin size="large" />
      </div>
    )

  if (error || !data?.sharedNoteInGroup)
    return <div className="shared-group-error">Ghi chú không tồn tại hoặc link không hợp lệ</div>

  const note = data.sharedNoteInGroup
  const isEditable = permissionData?.groupSharePermission === 'EDIT'

  return (
    <>
      <div className="shared-note-wrapper">
        <div style={{ marginBottom: 16 }}>
           <Breadcrumb items={[
             { title: <Link to="/">Trang chủ</Link> },
             { title: <Link to={`/shared-group/${token}`}>Nhóm được chia sẻ</Link> },
             { title: note.title }
           ]} />
        </div>

        <Space className="shared-note-header">
          <Title level={3} className="shared-note-title">
            {note.title} ({note.createdAt.slice(0, 10)})
          </Title>
          {isEditable && (
            <Button type="primary" onClick={handleSave} loading={saving}>
              Lưu
            </Button>
          )}
        </Space>

        <SunEditor
          setContents={content}
          onChange={setContent}
          disable={!isEditable}
          hideToolbar={!isEditable}
          setOptions={{
            height: 'calc(100vh - 150px)',
            buttonList: [
              ['undo', 'redo'],
              ['font', 'fontSize', 'formatBlock'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['table', 'link', 'image', 'video'],
              ['fullScreen', 'showBlocks', 'codeView'],
              ['preview', 'print'],
              ['save', 'template']
            ],
            defaultStyle: 'font-size: 16px;'
          }}
        />
      </div>
      <FloatingCalendar />
    </>
  )
}

export default SharedNoteInGroupPage
