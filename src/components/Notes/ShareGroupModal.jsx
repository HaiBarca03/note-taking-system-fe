import { useState } from 'react'
import { Modal, Radio, Button, Input, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { SHARE_GROUP_MUTATION } from '../../graphql/groups'

const ShareGroupModal = ({ open, groupId, onClose }) => {
  const [permission, setPermission] = useState('READ')
  const [shareLink, setShareLink] = useState(null)

  const [shareGroup, { loading }] = useMutation(SHARE_GROUP_MUTATION)

  const handleGenerateLink = async () => {
    if (!groupId) return

    try {
      const { data } = await shareGroup({
        variables: {
          id: groupId,
          permission
        }
      })

      const token = data.shareGroup
      const link = `${window.location.origin}/shared-group/${token}`
      setShareLink(link)
    } catch (err) {
      message.error('Không thể tạo link chia sẻ nhóm')
    }
  }

  return (
    <Modal
      title="🔗 Chia sẻ nhóm ghi chú"
      open={open}
      onCancel={() => {
        setShareLink(null)
        onClose()
      }}
      footer={null}
      destroyOnClose
    >
      <p>Bất kỳ ai có liên kết này đều có thể xem {permission === 'EDIT' ? 'và chỉnh sửa' : ''} tất cả các ghi chú trong nhóm này.</p>
      
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
      <div>
        <Button type="primary" loading={loading} onClick={handleGenerateLink}>
          Tạo link chia sẻ
        </Button>
      </div>

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

export default ShareGroupModal
