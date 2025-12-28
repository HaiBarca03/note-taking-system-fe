// src/components/notes/AddGroupModal.jsx
import { Modal, Form, Input, Button } from "antd";

const AddGroupModal = ({ open, onCancel, onAddGroup }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onAddGroup(values.name);
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title="Thêm nhóm mới"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Huỷ
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Tạo nhóm
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên nhóm"
          rules={[{ required: true, message: "Vui lòng nhập tên nhóm" }]}
        >
          <Input placeholder="Nhập tên nhóm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
