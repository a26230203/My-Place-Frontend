import Navbar from './NavBar'
import Journal from './Journal'
import Music from './Music'
import Photo from './Photo'


function HomePage(props) {
    return (
      <div className="home-page">
        {
        Object.keys(props.loginUser).length > 0
        ?<div>
          <Navbar loginUser={props.loginUser}/>
          this is home page
        </div>
        : props.history.push('/')
        }
      </div>

    );
  }

  export default HomePage;