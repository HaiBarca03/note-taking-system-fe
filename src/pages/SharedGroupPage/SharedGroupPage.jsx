import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Typography, List, Card, Space, Spin, Breadcrumb } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { GET_SHARED_GROUP_QUERY } from '../../graphql/groups'
import './SharedGroupPage.css'
import FloatingCalendar from '../../components/Calendar/FloatingCalendar'

const { Title, Text } = Typography

const SharedGroupPage = () => {
  const { token } = useParams()

  const { data, loading, error } = useQuery(GET_SHARED_GROUP_QUERY, {
    variables: { token }
  })

  if (loading)
    return (
      <div className="shared-group-loading">
        <Spin size="large" tip="Đang tải nhóm ghi chú..." />
      </div>
    )

  if (error || !data?.sharedGroupByToken)
    return <div className="shared-group-error">Link không hợp lệ hoặc nhóm đã bị xóa</div>

  const group = data.sharedGroupByToken

  return (
    <>
      <div className="shared-group-wrapper">
        <div style={{ marginBottom: 16 }}>
          <Breadcrumb items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <Link to={`/shared-group/${token}`}>Nhóm được chia sẻ</Link> },
            { title: group.name }
          ]} />
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <header className="shared-group-header">
            <Title level={2}>📁 {group.name}</Title>
            <Text type="secondary">Chia sẻ bởi: {group.user?.email}</Text>
          </header>

          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            dataSource={group.notes}
            renderItem={(note) => (
              <List.Item>
                <Link to={`/shared-note-in-group/${token}/${note.id}`}>
                  <Card
                    hoverable
                    className="note-card"
                    title={<span><FileTextOutlined /> {note.title}</span>}
                  >
                    <div className="note-preview">
                      {note.content ? (
                        <div dangerouslySetInnerHTML={{ __html: note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '') }} />
                      ) : (
                        <Text type="disabled">Không có nội dung</Text>
                      )}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        Cập nhật: {new Date(note.updatedAt).toLocaleDateString()}
                      </Text>
                    </div>
                  </Card>
                </Link>
              </List.Item>
            )}
            locale={{ emptyText: 'Nhóm này chưa có ghi chú nào' }}
          />
        </Space>
      </div>
      <FloatingCalendar />
    </>
  )
}

export default SharedGroupPage
