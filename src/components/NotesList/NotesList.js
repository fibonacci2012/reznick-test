import './NotesList.css';
import React, { useState, useEffect } from 'react';
import {Button, Card, List} from "antd";

const NotesList = ({onDelete}) => {
const [notes, setNotes] = useState([]);


  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  return (
      <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={notes}
    renderItem={(note) => (
      <List.Item>
        <Card title={note.title}>{note.text}<Button danger onClick={() => onDelete(note.id)}>del</Button></Card>

      </List.Item>
    )}
  />

  );
};

export default NotesList;
