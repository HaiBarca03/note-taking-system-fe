import React from "react";
import { Layout, Button, Space, Typography, Flex } from "antd";
import {
  FileTextOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  // Giả sử lấy token từ localStorage để check trạng thái đăng nhập
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <Header
      style={{
        backgroundColor: "#fff",
        padding: "0 50px",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <Flex justify="space-between" align="center" style={{ height: "100%" }}>
        {/* Logo Section */}
        <Flex
          align="center"
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          <FileTextOutlined
            style={{ fontSize: "24px", color: "#1677ff", marginRight: "8px" }}
          />
          <Text strong style={{ fontSize: "18px", color: "#1677ff" }}>
            SmartNote
          </Text>
        </Flex>

        {/* Auth Buttons Section */}
        <Space size="middle">
          {!isLoggedIn ? (
            <>
              <Button
                type="text"
                icon={<LoginOutlined />}
                onClick={() => console.log("Chuyển hướng Login")}
              >
                Đăng nhập
              </Button>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                shape="round"
                onClick={() => console.log("Chuyển hướng Register")}
              >
                Đăng ký
              </Button>
            </>
          ) : (
            <>
              <Text type="secondary">Chào bạn!</Text>
              <Button
                danger
                type="primary"
                ghost
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </>
          )}
        </Space>
      </Flex>
    </Header>
  );
};

export default Navbar;
