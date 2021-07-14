import { DeleteFilled} from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;
function AlbumList(props) {
  
    //Show each album cover photo
    const albumPhoto = props.photos.filter(photo => photo.album_id == props.album.id)
    const photosUrl = albumPhoto.map(photo => photo.image)

    return (
      <div className="album-List">
            <h4>{props.album.name }</h4>
            {photosUrl.length > 0
              ?<img alt={props.album.name} src={photosUrl[0]} onClick={() => props.handleClickCoverAlbum(props.album)}/>
              :<img alt={props.album.name} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png' 
              style={{width: '180px', height: '250px'}} onClick={() => props.handleClickCoverAlbum(props.album)}/>
            }
            <br/>
            <DeleteFilled className="album-btn" style={{fontSize: "24px"}} onClick={() => props.handleDelete(props.album)}/>
      </div>
    )
  }

  export default AlbumList;