import imgTrash from '../../img/trash.png';
import imgThumbnails from '../../img/thumbnails1.png';
import imgList from '../../img/list-view.png'
import {Button, Popconfirm} from "antd";
import './Toolbar.css';
import {useCallback, useState} from "react";
import classNames from "classnames";

const Toolbar = (props) => {
    const {notes, activeNoteID, handleNoteDelete, setCreate, listState} = props;
    const [imgTrashC, imgThumbnailsC, imgListC] = [
        <img src={imgTrash} alt="delete"/>,
        <img src={imgThumbnails} alt="thumbnails"/>,
        <img src={imgList} alt="list"/>
    ];
    const [isList, setIsList] = useState(true)

    const confirm = useCallback(() => {
        console.log('Yes')
        handleNoteDelete(activeNoteID)
    }, [activeNoteID]);
    const cancel = () => console.log('No');
    const listView = () => {
        setIsList(true)
    }
    const thumbnailsView = () => {
        setIsList(false)
    }

    return (
        <header className="toolbar__container">
            <div className="toolbar__grid__1row">
                <Button className={classNames('list-view-button', [isList && 'active'])} icon={imgThumbnailsC}
                        onClick={listView}/>
                <Button className={classNames('list-view-button', [!isList && 'active'])} icon={imgListC}
                        onClick={thumbnailsView}/>
            </div>
            <div className="toolbar__grid__2row">
                <Popconfirm
                    title="Delete the note"
                    description="Are you sure to delete this note?"
                    onConfirm={confirm}
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