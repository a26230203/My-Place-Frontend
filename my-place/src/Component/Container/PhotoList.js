import { Image, Select  } from 'antd';
import { DeleteFilled, FolderAddFilled, CloseCircleFilled} from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;
function PhotoList(props) {

 const [displayOption, setDisplayOption] = useState(false)

 const handleDisplayOption = () => {
  setDisplayOption(!displayOption)
 }

 const handleChange = (value) => {
    props.AddPhotoToAlbum(props.photo, value)
 }

    return (
      <div className="photo-List">
                <Image
                width={300}
                height={300}
                src={props.photo.image}
                />
            {props.handleRemoveFromAblum
            ? <DeleteFilled style={{fontSize: "24px", marginTop: '10px'}} 
            onClick={() => props.handleRemoveFromAblum(props.photo)}/>
            :<DeleteFilled style={{fontSize: "24px", marginTop: '20px'}} 
            onClick={() => props.handleDelete(props.photo)}/>
            }     
            {props.AddPhotoToAlbum?
            <FolderAddFilled style={{fontSize: "24px"}} onClick={() => handleDisplayOption()}/>
             :null
            } 
            {displayOption
            ?<div>
            <Select defaultValue='disabled' style={{ width: 200, alignItems:'center' }} onChange={handleChange}>
              <Option value='disabled' disabled >Select Album</Option>
                {props.album.map(album => {
                  return  <Option value={album.id} key={album.id}>{album.name}</Option>
                })}
                <Option value="">Create New Ablum</Option>
            </Select>
            <CloseCircleFilled onClick={() => handleDisplayOption()}/>
            </div>    
            :null
          }
      </div>

    );
  }

  export default PhotoList;