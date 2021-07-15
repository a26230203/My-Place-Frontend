import { NavLink } from 'react-router-dom'

function NavBar(props) {

    const handleLogout = () => {
        localStorage.clear()
        props.handleLoignUser('')
    }

    return (
      <div className="Main-navbar">
        <NavLink
        className="nav-bar"
        to="/homepage"
        activeStyle={{
            fontWeight: "bold",
            color: "red",
        }}
        onClick={() => props.handlehideMusic(true)}
        >
        Home
        </NavLink>
        
        <NavLink
        className="nav-bar"
        to="/photo"
        activeStyle={{
            fontWeight: "bold",
            color: "red",
        }}
        onClick={() => props.handlehideMusic(true)}
        >
        Photo
        </NavLink>

        <NavLink
        className="nav-bar"
        to="/journal"
        activeStyle={{
            fontWeight: "bold",
            color: "red",
        }}
        onClick={() => props.handlehideMusic(true)}
        >
        Journal
        </NavLink>

        <NavLink
        className="nav-bar"
        to="/notes"
        activeStyle={{
            fontWeight: "bold",
            color: "red",
        }}
        onClick={() => props.handlehideMusic(true)}
        >
        Notes
        </NavLink>

        <NavLink
        className="nav-bar"
        to="/profile"
        activeStyle={{
            fontWeight: "bold",
            color: "red",
        }}
        onClick={() => props.handlehideMusic(false)}
        >
        Profile
        </NavLink>

        <NavLink
        className="nav-bar"
        to="/"
        activeStyle={{
            fontWeight: "bold",
            color: "red",
        }}
        onClick={() => handleLogout()}
        >
        Logout
        </NavLink>

        
      </div>
    );
  }

  export default NavBar;

