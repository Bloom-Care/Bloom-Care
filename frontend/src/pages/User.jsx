import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import UserPosts from "../components/UserPosts";
import UsersEvents from "../components/UsersEvents";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.statusText);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <>
  <div className="homeH1">
    <h1 className="homeH1">{profileUsername}</h1>
    { !!isCurrentUserProfile && <button onClick={handleLogout} className="updateButton">Log Out</button> }
    </div>
    {/* <p>If the user had any data, here it would be</p> */}
    {/* <p>Fake Bio or something</p> */}
    {
      !!isCurrentUserProfile
        && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    }
    <h1 className="profilePost">Posts</h1>
    <div id='postsContainer'>
      <UserPosts/>
    </div>
    <h1 className="profileEvent">Events</h1>
    <div id='postsContainer'>
      <UsersEvents/>
    </div>
    
  </>;
}
