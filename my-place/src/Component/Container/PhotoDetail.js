import Navbar from '../NavBar'

function PhotoDetial(props) {
    return (
      <div className="photo-detial">
          <Navbar />
          <div>
              <h1>hello</h1>
              <li>{props.photo.name}</li>
              <img src={props.photo.image} alt={props.photo.name}/>
          </div>
      </div>

    );
  }

  export default PhotoDetial;