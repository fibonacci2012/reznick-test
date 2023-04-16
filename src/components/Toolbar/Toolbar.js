import imgTrash from '../../rsc/img/trash.png';
import imgThumbnails from '../../rsc/img/thumbnails1.png';
import imgList from '../../rsc/img/list-view.png'
import {Button, Popconfirm} from "antd";
import './Toolbar.css';
const Toolbar = () => {
    const imgTrashC = <img src={imgTrash}/>
    const confirm = () => console.log('Yes')
    const cancel = () => console.log('No')
    return (
        <div>

            <Popconfirm
    title="Delete the note"
    description="Are you sure to delete this note?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button icon={imgTrashC}></Button>
  </Popconfirm>
        </div>
    );
};

export default Toolbar;