import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    debugger
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(event.target)
    const [user, error] = await updateUsername(Object.fromEntries(formData.entries()));
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    if (error?.status > 400 && error?.status < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return <>
    
    <form onSubmit={handleSubmit} className="homeH1">
       <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="username">Contact Information</InputLabel>
          <Input
            id="username"
            name='username'
            placeholder="Update username"
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />

          <Input
          type='hidden'
            id="username"
            name='id'
            value={currentUser.id}
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>
        {/* <form onSubmit={handleSubmit}> */}
    {/* <label htmlFor='username'>New Username</label>
    <input type='text' id='username' name='username'/>
    <input type="hidden" name="id" value={currentUser.id} />
    <button>Update Username</button> */}
  {/* </form> */}
    <button type='submit'className="updateButton">Update Username</button>
   </form>;
   </>
}
