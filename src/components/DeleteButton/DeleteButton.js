import {useCallback, useState} from "react";
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
        <div className={classNames("delete_btn")}>
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
                    className={classNames("toolbar__grid__1row__btn_delete", [!activeNoteID && 'toolbar__grid__1row__btn_delete-disabled'])}
                    icon={imgTrashC}></Button>
            </Popconfirm>
        </div>
    )
}

export default DeleteButton;