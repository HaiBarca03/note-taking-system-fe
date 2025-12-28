import { Layout, Row, Col, Button, Card, Typography, Space } from "antd";
import {
  FolderOpenOutlined,
  FileTextOutlined,
  DeleteOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

const features = [
  {
    icon: <FolderOpenOutlined />,
    title: "Nhóm ghi chú",
    desc: "Tổ chức ghi chú theo nhóm rõ ràng, dễ quản lý.",
  },
  {
    icon: <FileTextOutlined />,
    title: "Ghi chú nhanh",
    desc: "Tạo và chỉnh sửa ghi chú chỉ trong vài giây.",
  },
  {
    icon: <DeleteOutlined />,
    title: "Thùng rác thông minh",
    desc: "Khôi phục hoặc xoá vĩnh viễn ghi chú đã xoá.",
  },
  {
    icon: <CalendarOutlined />,
    title: "Ngày & thời gian",
    desc: "Theo dõi ghi chú theo ngày tạo và cập nhật.",
  },
];

const HomePage = () => {
  return (
    <Layout style={{ background: "#f8fefe" }}>
      <Content style={{ padding: "80px 5%" }}>
        {/* HERO */}
        <Row align="middle" gutter={[48, 48]}>
          <Col xs={24} md={12}>
            <Title level={1} style={{ color: "#2ec4b6" }}>
              Ghi chú thông minh <br /> cho công việc & học tập
            </Title>
            <Text style={{ fontSize: 16 }}>
              Lưu trữ, phân loại và quản lý ghi chú của bạn một cách khoa học và
              an toàn.
            </Text>

            <Space style={{ marginTop: 32 }}>
              <Button
                type="primary"
                size="large"
                style={{
                  background: "#2ec4b6",
                  borderColor: "#2ec4b6",
                }}
                onClick={() => (window.location.href = "/my-notes")}
              >
                Bắt đầu ngay <ArrowRightOutlined />
              </Button>

              <Button
                size="large"
                onClick={() => (window.location.href = "/login")}
              >
                Đăng nhập
              </Button>
            </Space>
          </Col>

          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://res.cloudinary.com/dbzuqtojr/image/upload/v1766938778/note-logo-removebg-preview_crfln0.png"
              alt="notes"
              style={{
                width: "100%",
                maxWidth: 320,
                animation: "float 3s ease-in-out infinite",
              }}
            />
          </Col>
        </Row>

        {/* FEATURES */}
        <div style={{ marginTop: 120 }}>
          <Title level={2} style={{ textAlign: "center" }}>
            Tính năng nổi bật
          </Title>

          <Row gutter={[24, 24]} style={{ marginTop: 48 }}>
            {features.map((f, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    borderRadius: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      color: "#2ec4b6",
                      marginBottom: 16,
                    }}
                  >
                    {f.icon}
                  </div>
                  <Title level={4}>{f.title}</Title>
                  <Text>{f.desc}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* PREVIEW */}
        <Row align="middle" gutter={[48, 48]} style={{ marginTop: 120 }}>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
              alt="preview"
              style={{ width: "100%" }}
            /> */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
              alt="notes"
              style={{
                width: "100%",
                maxWidth: 320,
                animation: "float 3s ease-in-out infinite",
              }}
            />
          </Col>

          <Col xs={24} md={12}>
            <Title level={2}>Giao diện đẹp – Dễ dùng – Nhanh gọn</Title>
            <Text style={{ fontSize: 16 }}>
              Trải nghiệm ghi chú mượt mà với giao diện hiện đại, phù hợp mọi
              thiết bị.
            </Text>
          </Col>
        </Row>

        {/* CTA */}
        <div
          style={{
            marginTop: 120,
            textAlign: "center",
            padding: "60px 20px",
            background: "#cbf3f0",
            borderRadius: 24,
          }}
        >
          <Title level={2}>Sẵn sàng bắt đầu?</Title>
          <Text>Đăng nhập để quản lý ghi chú của bạn ngay hôm nay</Text>

          <div style={{ marginTop: 24 }}>
            <Button
              type="primary"
              size="large"
              style={{
                background: "#2ec4b6",
                borderColor: "#2ec4b6",
                marginRight: 16,
              }}
              onClick={() => (window.location.href = "/login")}
            >
              Đăng nhập
            </Button>
            <Button
              type="primary"
              size="large"
              style={{
                background: "#2ec4b6",
                borderColor: "#2ec4b6",
              }}
              onClick={() => (window.location.href = "/register")}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </Content>

      {/* CSS ANIMATION */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </Layout>
  );
};

export default HomePage;
