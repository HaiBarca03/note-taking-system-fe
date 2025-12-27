// src/components/notes/NotesContent.jsx
import { Empty, Typography, Button, Space, message } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useEffect, useState } from "react";

const { Title } = Typography;

const NotesContent = ({ note }) => {
  const [content, setContent] = useState("");

  // Khi chọn note khác → load content
  useEffect(() => {
    if (note?.content) {
      setContent(note.content);
    } else {
      setContent("");
    }
  }, [note]);

  if (!note) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Empty description="Select a note to view content" />
      </div>
    );
  }

  const handleSave = () => {
    console.log("SAVE NOTE:", {
      noteId: note.id,
      content,
    });

    // TODO: call GraphQL mutation updateNote
    message.success("Note saved successfully 💾");
  };

  return (
    <div
      style={{
        padding: 24,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Space
        style={{
          marginBottom: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          {note.title}
        </Title>

        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </Space>

      {/* Editor */}
      <SunEditor
        setContents={content}
        onChange={setContent}
        setOptions={{
          height: "calc(100vh - 180px)",
          buttonList: [
            [
              "undo",
              "redo",
              "font",
              "fontSize",
              "formatBlock",
              "bold",
              "underline",
              "italic",
              "strike",
              "fontColor",
              "hiliteColor",
              "align",
              "list",
              "table",
              "link",
              "image",
              "video",
              "fullScreen",
              "codeView",
              "removeFormat",
            ],
          ],
          defaultStyle: "font-size: 16px;",
          font: [
            "Arial",
            "Comic Sans MS",
            "Courier New",
            "Georgia",
            "Tahoma",
            "Trebuchet MS",
            "Verdana",
          ],
        }}
      />
    </div>
  );
};

export default NotesContent;
