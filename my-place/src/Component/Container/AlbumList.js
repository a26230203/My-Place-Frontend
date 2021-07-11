import { DeleteFilled} from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;
function AlbumList(props) {
  
    //Show each album cover photo
    const coverPhot = () => {
        const albumPhoto = props.photos.filter(photo => photo.album_id == props.album.id)
        const photosUrl = albumPhoto.map(photo => {
            return photo.image
        })
        return photosUrl[0]
    }

    return (
      <div className="album-List">
            <h4>{props.album.name }</h4>
            <img alt={props.album.name} src={coverPhot()} onClick={() => props.handleClickCoverAlbum(props.album)}/>
            <br/>
            <DeleteFilled className="album-btn" style={{fontSize: "24px"}} onClick={() => props.handleDelete(props.album)}/>
      </div>
    )
  }

  export default AlbumList;