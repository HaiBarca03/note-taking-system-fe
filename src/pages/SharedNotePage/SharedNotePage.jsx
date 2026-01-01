import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Typography, Button, Space, message, Spin } from 'antd'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { GET_SHARED_NOTE, UPDATE_SHARED_NOTE } from '../../graphql/notes'
import './SharedNotePage.css'

const { Title } = Typography

const SharedNotePage = () => {
  const { token } = useParams()

  const [content, setContent] = useState('')

  const { data, loading, error } = useQuery(GET_SHARED_NOTE, {
    variables: { token }
  })

  const [updateSharedNote, { loading: saving }] = useMutation(
    UPDATE_SHARED_NOTE
  )

  useEffect(() => {
    if (data?.sharedNote) {
      setContent(data.sharedNote.content || '')
    }
  }, [data])

  const handleSave = async () => {
    try {
      await updateSharedNote({
        variables: {
          token,
          content
        }
      })
      message.success('Đã lưu ghi chú')
    } catch (err) {
      message.error('Bạn không có quyền chỉnh sửa ghi chú này')
    }
  }

  if (loading)
    return (
      <div className="shared-note-loading">
        <Spin size="large" />
      </div>
    )

  if (error)
    return <div className="shared-note-error">Link không hợp lệ</div>

  const note = data.sharedNote

  return (
    <div className="shared-note-wrapper">
      {/* Header */}
      <Space className="shared-note-header">
        <Title level={3} className="shared-note-title">
          {note.title} ({note.createdAt.slice(0, 10)})
        </Title>

        <Button
          type="primary"
          className="shared-note-save-btn"
          onClick={handleSave}
          loading={saving}
        >
          Lưu
        </Button>
      </Space>

      {/* Editor */}
      <SunEditor
        setContents={content}
        className="shared-note-editor"
        onChange={setContent}
        setOptions={{
          height: 'calc(100vh - 100px)',
          buttonList: [
            [
              'undo',
              'redo',
              'font',
              'fontSize',
              'formatBlock',
              'bold',
              'underline',
              'italic',
              'strike',
              'fontColor',
              'hiliteColor',
              'align',
              'list',
              'table',
              'link',
              'image',
              'video',
              'fullScreen',
              'codeView',
              'removeFormat'
            ]
          ],
          defaultStyle: 'font-size: 16px;'
        }}
      />
    </div>
  )
}

export default SharedNotePage
