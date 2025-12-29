// src/components/notes/NotesContent.jsx
import { Empty, Typography, Button, Space, message } from 'antd'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { useEffect, useState } from 'react'
import { UPDATE_NOTE_MUTATION } from '../../graphql/notes'
import { useMutation } from '@apollo/client'
import './NotesContent.css' // ✅ thêm CSS
const { Title } = Typography

const NotesContent = ({ note }) => {
  const [content, setContent] = useState('')

  const [updateNote, { loading }] = useMutation(UPDATE_NOTE_MUTATION)

  useEffect(() => {
    if (note?.content) {
      setContent(note.content)
    } else {
      setContent('')
    }
  }, [note])

  if (!note) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Empty description="Select a note to view content" />
      </div>
    )
  }

  const handleSave = async () => {
    try {
      await updateNote({
        variables: {
          input: {
            id: note.id,
            content: content
            // title: note.title, // nếu cho phép sửa title thì thêm
            // groupId: note.groupId
          }
        }
      })

      message.success('Lưu ghi chú thành công 💾')
    } catch (error) {
      console.error(error)
      message.error('Có lỗi xảy ra ❌')
    }
  }

  return (
    <div className="notes-content-wrapper">
      {/* Header cố định */}
      <Space className="notes-content-header">
        <Title className="notes-name-header" level={3} style={{ margin: 0 }}>
          {note.title} ({note.createdAt.slice(0, 10)})
        </Title>

        <Button
          className="btn-save-mobile"
          type="primary"
          onClick={handleSave}
          loading={loading}
        >
          Lưu
        </Button>
      </Space>

      {/* Editor */}
      <SunEditor
        setContents={content}
        className="notes-editor"
        onChange={setContent}
        setOptions={{
          height: 'calc(100vh - 100px)', // trừ header + padding
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

export default NotesContent
