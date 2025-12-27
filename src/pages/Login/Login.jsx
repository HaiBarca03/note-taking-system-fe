// src/pages/Login.jsx
import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { LOGIN_MUTATION } from "../../graphql/auth";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../router/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onFinish = async (values) => {
    try {
      const { data } = await login({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });
      console.log("Form values:", data); // Debugging line

      const token = data.login.access_token;

      // Lưu vào Redux + localStorage
      dispatch(setLogin(token));

      message.success("Đăng nhập thành công 🚀");
      navigate("/"); // hoặc dashboard
    } catch (error) {
      message.error(error?.graphQLErrors?.[0]?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Card title="Đăng nhập" style={{ width: 380 }} bordered={false}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
