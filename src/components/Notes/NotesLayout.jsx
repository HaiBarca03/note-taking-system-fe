// src/components/notes/NotesLayout.jsx
import { Row, Col } from "antd";
import NotesSidebar from "./NotesSidebar";
import NotesContent from "./NotesContent";
import { useState } from "react";

const NotesLayout = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [filterDate, setFilterDate] = useState(null);

  return (
    <Row style={{ height: "100vh" }}>
      {/* Sidebar 3/7 */}
      <Col
        span={8}
        style={{
          borderRight: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NotesSidebar
          onSelectNote={setSelectedNote}
          filterDate={filterDate}
          onFilterChange={setFilterDate}
        />
      </Col>

      {/* Content 7/7 */}
      <Col span={16}>
        <NotesContent note={selectedNote} />
      </Col>
    </Row>
  );
};

export default NotesLayout;
