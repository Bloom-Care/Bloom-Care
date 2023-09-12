import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import logo from '../img/logo.png'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// const logedinPages = ['Home', 'Event', "Create Post", 'Create Event'];

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const id = currentUser ? currentUser.id : ''; 
  const logedinPages = [{name:"Home", url:'/'},{name:"Event", url:'/eventPage'}, {name:"Post Form", url:'/createPostPage'},{name:"Event Form", url:'/createEventForm'}]
const logedinSettings = [ {name:'Profile', url:`/users/${id}`}];
const noUserPages=[{name:"Home", url:'/'},{name:"Event", url:'/eventPage'}]
const noUserSettings = [{name:"Log In", url:'/login'}, {name:"Sign up", url:'/sign-up'}]
  const nav = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

  <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img id='logo' src={logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></img>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {currentUser? logedinPages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center"><NavLink id='headingText' to={page.url} >{page.name}</NavLink></Typography>
                </MenuItem>
              )):noUserPages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center"><NavLink id='headingText' to={page.url} >{page.name}</NavLink></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        <div id='centerLogo'><img id='responsiveLogo' src={logo}></img></div>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {currentUser? logedinPages.map((page) => (
              <Typography textAlign="center"><NavLink id='headingText' to={page.url} >{page.name}</NavLink></Typography>
            )) :noUserPages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu} >
                <Typography textAlign="center"><NavLink id='headingText' to={page.url} >{page.name}</NavLink></Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open logedinSettings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ManageAccountsIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser?logedinSettings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Typography textAlign="center"><NavLink id='headingText' to={setting.url} >{setting.name}</NavLink></Typography></Typography>
                </MenuItem>
              )):noUserSettings.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center"><NavLink id='headingText' to={page.url} >{page.name}</NavLink></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
