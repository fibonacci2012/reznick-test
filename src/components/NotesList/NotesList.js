import './NotesList.css';
import React, {useState, useEffect} from 'react';
import {Button, Card, List, Popconfirm} from "antd";
import NoteService from "../API/NoteService";
import imgTrash from "../../rsc/img/trash.png";

const NotesList = ({arrayOfNotes}) => {
    const [notes, setNotes] = useState([]);
    const imgTrashC = <img src={imgTrash}/>
    const confirm = () => console.log('Yes')
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
                    <Card bodyStyle={{height: "120px", width: "120px"}} title={note.title}>{note.body}
                        <Popconfirm
                            title="Delete the note"
                            description="Are you sure to delete this note?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={imgTrashC}></Button>
                        </Popconfirm></Card>

                </List.Item>
            )}
        />

    );
};

export default NotesList;
