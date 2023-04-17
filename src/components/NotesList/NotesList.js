import './NotesList.css';
import React, {useState, useEffect} from 'react';
import {Button, Card, List, Popconfirm} from "antd";
import NoteService from "../API/NoteService";
import imgTrash from "../../rsc/img/trash.png";

const NotesList = ({}) => {
    const [notes, setNotes] = useState([]);
    const imgTrashC = <img src={imgTrash}/>

    const confirm = ({remove}) => {
        const removeNote = (note) => {
            setNotes(notes.filter(n => n.id !== note.id))
        };
    };


    const cancel = () => console.log('No')

    async function fetchNotes() {
        const notes = await NoteService.getAll();
        setNotes(notes.data)
    };
    useEffect(() => {
        fetchNotes();
    }, [])


    return (
        <List
            grid={{
                gutter: 16,
                xs: 2,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
            }}
            dataSource={notes}
            renderItem={(note) => (
                <List.Item
                    //style={{display: "none"}}
                    extra={<Popconfirm
                        title="Delete the note"
                        description="Are you sure to delete this note?"
                        onConfirm={confirm({})}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={imgTrashC}></Button>
                    </Popconfirm>}
                >
                    <Card bodyStyle={{height: "120px", width: "120px", overflow: "scroll"}}
                          title={note.title}>{note.body}
                    </Card>


                </List.Item>
            )}
        />

    );
};

export default NotesList;
