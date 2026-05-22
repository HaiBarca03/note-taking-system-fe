import React, { useEffect } from 'react'
import { Form, Input, Button, Card, message, Row, Col, Typography } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { LOGIN_MUTATION } from '../../graphql/auth'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../../router/auth/authSlice'
import './Login.css'

const { Title, Text } = Typography

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { loading }] = useMutation(LOGIN_MUTATION)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    if (token || refreshToken) {
      navigate('/my-notes')
    }
  }, [navigate])

  const onFinish = async (values) => {
    try {
      const { data } = await login({
        variables: {
          data: {
            email: values.email,
            password: values.password
          }
        }
      })

      const token = data.login.access_token
      const refreshToken = data.login.refresh_token
      dispatch(setLogin({ access_token: token, refresh_token: refreshToken }))

      message.success('Đăng nhập thành công 🚀')
      navigate('/my-notes')
    } catch (error) {
      message.error(error?.graphQLErrors?.[0]?.message || 'Đăng nhập thất bại')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
      }}
    >
      <Card
        bordered={false}
        style={{
          width: '100%',
          maxWidth: 900,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }}
      >
        <Row>
          {/* LEFT - FORM */}
          <Col xs={24} md={12} style={{ padding: 40 }}>
            <Title level={2} style={{ color: '#13c2c2' }}>
              Welcome Back 👋
            </Title>
            <Text type="secondary">Đăng nhập để tiếp tục ghi chú của bạn</Text>

            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: 32 }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="user@example.com"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  { min: 6, message: 'Tối thiểu 6 ký tự' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                style={{
                  background: '#13c2c2',
                  borderColor: '#13c2c2',
                  marginTop: 8
                }}
              >
                Đăng nhập
              </Button>
            </Form>
            <span style={{ display: 'block', marginTop: 16 }}>
              Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </span>
          </Col>

          {/* RIGHT - IMAGE */}
          <Col
            xs={0}
            md={12}
            style={{
              background: 'linear-gradient(135deg, #e6fffb 0%, #b5f5ec 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 40
            }}
          >
            <img
              src="https://res.cloudinary.com/dbzuqtojr/image/upload/v1766938778/note-logo-removebg-preview_crfln0.png"
              alt="Notes"
              style={{
                width: 360,
                animation: 'float 3s ease-in-out infinite'
              }}
            />

            <Title level={4} style={{ marginTop: 24 }}>
              Ghi chú thông minh ✍️
            </Title>
            <Text type="secondary" style={{ textAlign: 'center' }}>
              Quản lý ghi chú • Nhóm • Thùng rác • Ngày tháng
            </Text>
          </Col>
        </Row>
      </Card>

      {/* animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  )
}

export default Login
