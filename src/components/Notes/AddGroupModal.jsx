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
      title="Add New Group"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add Group
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Group Name"
          rules={[{ required: true, message: "Please enter a group name" }]}
        >
          <Input placeholder="Enter group name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
