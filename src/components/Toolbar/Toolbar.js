import imgTrash from '../../img/trash.png';
import imgThumbnails from '../../img/thumbnails1.png';
import imgList from '../../img/list-view.png'
import {Button, Popconfirm} from "antd";
import './Toolbar.scss';
import {useCallback, useState} from "react";
import classNames from "classnames";
import DeleteButton from "../DeleteButton/DeleteButton";

const Toolbar = (props) => {
    const {notes, activeNoteID, handleNoteDelete, setCreate, listState} = props;
    const [imgTrashC, imgThumbnailsC, imgListC] = [<img src={imgTrash} alt="delete"/>,
        <img src={imgThumbnails} alt="thumbnails"/>, <img src={imgList} alt="list"/>];
    const [isList, setIsList] = useState(true)

    const confirm = useCallback(() => {
        handleNoteDelete(activeNoteID)
    }, [activeNoteID]);
    const cancel = () => console.log('No');
    const listView = () => {
        setIsList(true)
        listState(true)
    }


    const thumbnailsView = () => {
        setIsList(false)
        listState(false)
    }

    return (<header className="toolbar__grid">
            <div className="toolbar__grid__1row">
                <div className="toolbar__grid__1row__switcher">
                    <Button className={classNames('list-view-button', [isList && 'active'])} icon={imgListC}
                            onClick={listView}/>
                    <Button className={classNames('list-view-button', [!isList && 'active'])} icon={imgThumbnailsC}
                            onClick={thumbnailsView}/>
                </div>
                <DeleteButton
                    activeNoteID={activeNoteID}
                    handleNoteDelete={handleNoteDelete}
                />

                <Button onClick={() => setCreate()}>New note</Button>
            </div>
            <div className="toolbar__grid__2row">

            </div>
            <div className="toolbar__grid__3row">
            </div>
        </header>);
};

export default Toolbar;