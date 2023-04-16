import './NotesList.css';
import React, { useState, useEffect } from 'react';
import {Button, Card, List} from "antd";
import NoteService from "../API/NoteService";

const NotesList = () => {
const [notes, setNotes] = useState([]);
  async function fetchNotes() {
        const notes = await NoteService.getAll();
        setNotes(notes.data)
    };

    useEffect(() => {
        fetchNotes()
    }, [])


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
        <Card title={note.title}>{note.body}<Button danger>del</Button></Card>

      </List.Item>
    )}
  />

  );
};

export default NotesList;
