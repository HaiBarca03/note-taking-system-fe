import { Row, Col, Drawer, Button } from 'antd'
import NotesSidebar from './NotesSidebar'
import NotesContent from './NotesContent'
import { useState } from 'react'
import './NotesLayout.css'

const NotesLayout = () => {
  const [selectedNote, setSelectedNote] = useState(null)
  const [filterDate, setFilterDate] = useState(null)
  const [drawerVisible, setDrawerVisible] = useState(false)

  return (
    <div className="notes-layout">
      {/* Desktop sidebar */}
      <div className="notes-sidebar-desktop">
        <NotesSidebar
          onSelectNote={setSelectedNote}
          filterDate={filterDate}
          onFilterChange={setFilterDate}
        />
      </div>

      {/* Mobile sidebar */}
      <Drawer
        title="Nhóm & Ghi chú"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <NotesSidebar
          onSelectNote={(note) => {
            setSelectedNote(note)
            setDrawerVisible(false)
          }}
          filterDate={filterDate}
          onFilterChange={setFilterDate}
        />
      </Drawer>

      {/* Content */}
      <div className="notes-content">
        <Button
          className="sidebar-toggle-btn"
          type="primary"
          onClick={() => setDrawerVisible(true)}
        >
          ☰ Nhóm
        </Button>
        <NotesContent note={selectedNote} />
      </div>
    </div>
  )
}

export default NotesLayout
