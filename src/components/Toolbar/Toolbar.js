import imgTrash from '../../img/trash.png';
import imgThumbnails from '../../img/thumbnails1.png';
import imgList from '../../img/list-view.png'
import {Button, Popconfirm} from "antd";
import './Toolbar.css';
import {useCallback} from "react";

const Toolbar = (props) => {
    const {notes, activeNoteID, handleNoteDelete, setCreate} = props;
    const [imgTrashC, imgThumbnailsC, imgListC] = [
        <img src={imgTrash} alt="delete"/>,
        <img src={imgThumbnails} alt="thumbnails"/>,
        <img src={imgList} alt="list"/>
    ];

    const confirm = useCallback(() => {
        console.log('Yes')
        handleNoteDelete(activeNoteID)
    }, [activeNoteID]);
    const cancel = () => console.log('No');
    const listView = () => console.log('List view on')
    const thumbnailsView = () => console.log('Thumbnails view on')

    return (
        <header className="toolbar__container">
            <div className="toolbar__grid__1row">
                <Button icon={imgThumbnailsC} onClick={listView}/>
                <Button icon={imgListC} onClick={thumbnailsView}/>
            </div>
            <div className="toolbar__grid__2row">
                <Popconfirm
                    title="Delete the note"
                    description="Are you sure to delete this note?"
                    onConfirm={confirm}// {notes.map((note) => handleNoteDelete(note.id))}
                    onCancel={cancel}
                    okText="Yeah, bitch!"
                    cancelText="No"
                >
                    <Button className="toolbar__btn_delete" icon={imgTrashC}></Button>
                </Popconfirm>
            </div>
             <div className="toolbar__grid__3row">
                <Button onClick={() => setCreate(true)}>New note</Button>
            </div>
        </header>
    );
};

export default Toolbar;