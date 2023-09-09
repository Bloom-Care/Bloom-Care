import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import logo from '../img/logo.png'

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <img id='logo' src={logo}></img>
    <nav>
      <ul>
      <li><NavLink to='/CreatePostPage'>Post Form</NavLink></li>
      <li><NavLink to='/createEventForm'>Event Form</NavLink></li>
        <li><NavLink to='/'>Home</NavLink></li>

        
        {
          currentUser
            ? 
            <>
            <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
            <li><NavLink to='/eventPage'>Events</NavLink></li>
            </>
            : 
            <>
              <li><NavLink to='/login'>Login</NavLink></li>
              {/* <li><NavLink to='/sign-up'>Sign Up</NavLink></li> */}
            </>
        }
        <li><NavLink to='aboutUs'>About Page</NavLink></li>
      </ul>
    </nav>
  </header>;
}
