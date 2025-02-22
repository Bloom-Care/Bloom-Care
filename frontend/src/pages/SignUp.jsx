import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import Box from '@mui/material/Box'; // new
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';

// Controlling the signup form is a good idea because we want to adde (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {

  const [showPassword, setShowPassword] = useState(false); // Add showPassword state

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // We could also use a single state variable for the form data:
  // const [formData, setFormData] = useState({ username: '', password: '' });
  // What would be the pros and cons of that?

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password });
    if (error) return setErrorText(error.statusText);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return <>
    <form onSubmit={handleSubmit} onChange={handleChange} className="signoutPage">
    <h1 className="signupH1Ptag">Sign Up</h1>

    
    <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name='username'
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>


<FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

      <button className="signupButton">Sign Up Now!</button>
    </form>
    { !!errorText && <p>{errorText}</p> }
    <p className="signupPtag">Already have an account with us? <Link to="/login">Log in!</Link></p>
  </>;
}
