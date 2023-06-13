import {useCallback, useState} from "react";
import './DeleteButton.scss';
import imgTrash from '../../img/trash.png';
import {Button, Popconfirm} from "antd";
import classNames from "classnames";


function DeleteButton(props) {
    const {handleNoteDelete, activeNoteID} = props
    const [imgTrashC] = [<img src={imgTrash} alt="delete"/>]
    const confirm = useCallback(() => {
        handleNoteDelete(activeNoteID)
    }, [activeNoteID]);
    const cancel = () => console.log('No');
    return (
        <div className={classNames("delete__el")}>
            <Popconfirm
                title="Delete the note"
                description="Are you sure to delete this note?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yeah, bitch!"
                cancelText="No"
                disabled={(activeNoteID === 0)}
            >
                <Button
                    className={classNames("delete__el-btn", [!activeNoteID && "delete__el-btn__disabled"])}
                    icon={imgTrashC}>
                </Button>


            </Popconfirm>
        </div>
    )
}

export default DeleteButton;