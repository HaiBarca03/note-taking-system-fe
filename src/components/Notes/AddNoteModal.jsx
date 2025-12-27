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
      title={`Add note to "${group?.name || ""}"`}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add Note
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Note title"
          rules={[
            { required: true, message: "Please enter note title" },
            { max: 100, message: "Max 100 characters" },
          ]}
        >
          <Input placeholder="Enter note title..." autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;
