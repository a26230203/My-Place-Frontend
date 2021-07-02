import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
      <div >
        <NavLink
        className="nav-bar"
        to="/homepage"
        activeStyle={{
            fontWeight: "bold",
            color: "red",
        }}
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
        >
        Journal
        </NavLink>

      </div>
    );
  }

  export default NavBar;

