import { Modal, Form, Input, Button } from "antd";

const AddNoteModal = ({ open, onCancel, onAddNote, group }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      onAddNote({
        title: values.title,
        groupId: group.id,
      });

      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title={`Thêm ghi chú vào nhóm "${group?.name || ""}"`}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Huỷ
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Tạo ghi chú
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Tiêu đề ghi chú"
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề ghi chú" },
            { max: 100, message: "Tối đa 100 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tiêu đề ghi chú..." autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;
