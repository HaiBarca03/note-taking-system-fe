// src/pages/Register.jsx
import React from "react";
import { Form, Input, Button, Card, message, Row, Col, Typography } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLogin } from "../../router/auth/authSlice";
import { REGISTER_MUTATION } from "../../graphql/auth";

const { Title, Text } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER_MUTATION);

  const onFinish = async (values) => {
    try {
      const { data } = await register({
        variables: {
          data: {
            email: values.email,
            password: values.password,
            fullName: values.fullName,
          },
        },
      });

      const token = data.register.access_token;
      dispatch(setLogin(token));

      message.success("Đăng ký thành công 🎉");
      navigate("/");
    } catch (error) {
      message.error(error?.graphQLErrors?.[0]?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Card
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        <Row>
          {/* LEFT - FORM */}
          <Col xs={24} md={12} style={{ padding: 40 }}>
            <Title level={2} style={{ color: "#13c2c2" }}>
              Create Account ✨
            </Title>
            <Text type="secondary">Tạo tài khoản để bắt đầu ghi chú</Text>

            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: 32 }}
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Đoàn Đức Hải"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
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
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  { min: 6, message: "Tối thiểu 6 ký tự" },
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
                  background: "#13c2c2",
                  borderColor: "#13c2c2",
                  marginTop: 8,
                }}
              >
                Đăng ký
              </Button>

              <Text
                type="secondary"
                style={{ display: "block", marginTop: 16 }}
              >
                Đã có tài khoản?{" "}
                <Link to="/login" style={{ color: "#13c2c2" }}>
                  Đăng nhập
                </Link>
              </Text>
            </Form>
          </Col>

          {/* RIGHT - IMAGE */}
          <Col
            xs={0}
            md={12}
            style={{
              background: "linear-gradient(135deg, #e6fffb 0%, #b5f5ec 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 40,
            }}
          >
            <img
              src="https://res.cloudinary.com/dbzuqtojr/image/upload/v1766938778/note-logo-removebg-preview_crfln0.png"
              alt="Register"
              style={{
                width: 360,
                animation: "float 3s ease-in-out infinite",
              }}
            />

            <Title level={4} style={{ marginTop: 24 }}>
              Bắt đầu ngay hôm nay 🚀
            </Title>
            <Text type="secondary" style={{ textAlign: "center" }}>
              Ghi chú • Nhóm • Đồng bộ • An toàn
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
  );
};

export default Register;
