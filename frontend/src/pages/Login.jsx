import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
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

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showPassword, setShowPassword] = useState(false); // Add showPassword state

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData.entries()));
    if (error) return setErrorText(error.statusText);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <>
      <form onSubmit={handleSubmit} className="loginPage">
          <h1>Login</h1>
        
        <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
        <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name='username'
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
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

        <button className="logButton">Log in!</button>

      </form>
      <p className="signupPtag">Already have an account with us? <Link to="/sign-up">Sign up!</Link></p>
      { !!errorText && <p>{errorText}</p> }
    </>
  );
}
