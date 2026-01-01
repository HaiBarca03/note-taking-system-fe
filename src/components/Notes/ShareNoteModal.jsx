import { useState } from 'react'
import { Modal, Radio, Button, Input, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { SHARE_NOTE_MUTATION } from '../../graphql/notes'

const ShareNoteModal = ({ open, noteId, onClose }) => {
  const [permission, setPermission] = useState('READ')
  const [shareLink, setShareLink] = useState(null)

  const [shareNote, { loading }] = useMutation(SHARE_NOTE_MUTATION)

  const handleGenerateLink = async () => {
    if (!noteId) return

    try {
      const { data } = await shareNote({
        variables: {
          id: noteId,
          permission
        }
      })

      const token = data.shareNote
      const link = `${window.location.origin}/shared-note/${token}`
      setShareLink(link)
    } catch (err) {
      message.error('Không thể tạo link chia sẻ')
    }
  }

  return (
    <Modal
      title="🔗 Chia sẻ ghi chú"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {/* Permission */}
      <Radio.Group
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
        style={{ marginBottom: 16 }}
      >
        <Radio value="READ">Chỉ xem</Radio>
        <Radio value="EDIT">Cho phép chỉnh sửa</Radio>
      </Radio.Group>

      {/* Generate link */}
      <Button type="primary" loading={loading} onClick={handleGenerateLink}>
        Tạo link chia sẻ
      </Button>

      {/* Link + copy */}
      {shareLink && (
        <div style={{ marginTop: 16 }}>
          <Input
            value={shareLink}
            readOnly
            addonAfter={
              <CopyOutlined
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigator.clipboard.writeText(shareLink)
                  message.success('Đã copy link')
                }}
              />
            }
          />
        </div>
      )}
    </Modal>
  )
}

export default ShareNoteModal
