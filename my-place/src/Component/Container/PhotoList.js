import { Image, Select  } from 'antd';
import { DeleteFilled, FolderAddFilled} from '@ant-design/icons';

const { Option } = Select;
function PhotoList(props) {

 const handleChange = () => {

 }

    return (
      <div className="photo-List">
            {/* <Image.PreviewGroup> */}
                <Image
                width={300}
                height={200}
                src={props.photo.image}
                />
            {/* </Image.PreviewGroup> */}
            <DeleteFilled style={{fontSize: "24px"}} onClick={() => props.handleDelete(props.photo)}/>
            <FolderAddFilled style={{fontSize: "24px"}}/>
            <Select defaultValue="" style={{ width: 120 }} onChange={() => handleChange()}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
          </Select>

      </div>

    );
  }

  export default PhotoList;