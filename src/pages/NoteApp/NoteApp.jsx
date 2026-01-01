import { Layout, Row, Col, Button, Card, Typography, Space } from "antd";
import { useEffect, useRef, useState } from "react";
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

const AnimatedSection = ({ children, delay = 0, animation = "fadeInUp" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`animated-section ${isVisible ? animation : ""}`}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  return (
    <Layout style={{ background: "#f8fefe" }}>
      <Content style={{ padding: "80px 5%" }}>
        {/* HERO */}
        <Row align="middle" gutter={[48, 48]}>
          <Col xs={24} md={12}>
            <AnimatedSection animation="fadeInLeft">
              <Title level={1} style={{ color: "#2ec4b6" }}>
                Ghi chú thông minh <br /> cho công việc & học tập
              </Title>
              <Text style={{ fontSize: 16 }}>
                Lưu trữ, phân loại và quản lý ghi chú của bạn một cách khoa học và
                an toàn.
              </Text>
              <br />
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
            </AnimatedSection>
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
            <AnimatedSection animation="fadeInRight">
              <img
                src="https://res.cloudinary.com/dbzuqtojr/image/upload/v1766938778/note-logo-removebg-preview_crfln0.png"
                alt="notes"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  animation: "float 3s ease-in-out infinite",
                }}
              />
            </AnimatedSection>
          </Col>
        </Row>

        {/* FEATURES */}
        <div style={{ marginTop: 120 }}>
          <AnimatedSection animation="fadeInUp">
            <Title level={2} style={{ textAlign: "center" }}>
              Tính năng nổi bật
            </Title>
          </AnimatedSection>

          <Row gutter={[24, 24]} style={{ marginTop: 48 }}>
            {features.map((f, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <AnimatedSection delay={index * 100} animation="fadeInUp">
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
                </AnimatedSection>
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
            <AnimatedSection animation="fadeInLeft">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                alt="notes"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  animation: "float 3s ease-in-out infinite",
                }}
              />
            </AnimatedSection>
          </Col>

          <Col xs={24} md={12}>
            <AnimatedSection animation="fadeInRight">
              <Title level={2}>Giao diện đẹp – Dễ dùng – Nhanh gọn</Title>
              <Text style={{ fontSize: 16 }}>
                Trải nghiệm ghi chú mượt mà với giao diện hiện đại, phù hợp mọi
                thiết bị.
              </Text>
            </AnimatedSection>
          </Col>
        </Row>

        {/* CTA */}
        <AnimatedSection animation="zoomIn">
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
        </AnimatedSection>
      </Content>

      {/* CSS ANIMATION */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .animated-section {
            opacity: 0;
            transition: all 0.8s ease-out;
          }

          .fadeInUp {
            opacity: 1;
            animation: fadeInUp 0.8s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fadeInLeft {
            opacity: 1;
            animation: fadeInLeft 0.8s ease-out;
          }

          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .fadeInRight {
            opacity: 1;
            animation: fadeInRight 0.8s ease-out;
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .zoomIn {
            opacity: 1;
            animation: zoomIn 0.8s ease-out;
          }

          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default HomePage;