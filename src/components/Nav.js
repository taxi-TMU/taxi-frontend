import React, { useState, useRef, useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Box,
  MenuList,
  Link,
  MenuItem,
  Hidden,
  IconButton,
  Menu,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ReactComponent as Logo } from '../images/logo.svg';
import UserContext from '../context/UserContext';
import { logout } from '../utils/auth';

const Nav = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const menu = useRef();

  const { user, setUser } = useContext(UserContext);

  const handleOpenMenu = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <Box ref={menu}>
      <AppBar className={classes.root} position="static">
        <Box className={classes.languages}>
          {/* mobile nav */}
          <Hidden smUp>
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              open={isOpen}
              anchorEl={menu.current}
              onClose={handleOpenMenu}
              className={classes.mobileMenu}
            >
              <MenuItem>
                <RouterLink
                  to="/simulation"
                  activeClassName={classes.navLink}
                  className={classes.title}
                >
                  Simulation
                </RouterLink>
              </MenuItem>
              <MenuItem>
                <RouterLink
                  to="/categories"
                  activeClassName={classes.navLink}
                  className={classes.title}
                >
                  Train by category
                </RouterLink>
              </MenuItem>
              <MenuItem>
                {user ? (
                  <RouterLink
                    to="/dashboard"
                    activeClassName={classes.navLink}
                    className={classes.title}
                  >
                    Dashboard
                  </RouterLink>
                ) : (
                  <RouterLink
                    to="/aboout"
                    activeClassName={classes.navLink}
                    className={classes.title}
                  >
                    Dashboard
                  </RouterLink>
                )}
              </MenuItem>
              <MenuItem>
                {user ? (
                  <RouterLink
                    to="/"
                    className={classes.title}
                    onClick={() => {
                      logout();
                      setUser();
                    }}
                  >
                    Logout
                  </RouterLink>
                ) : (
                  <RouterLink
                    to="/login"
                    activeClassName={classes.navLink}
                    className={classes.title}
                  >
                    Login
                  </RouterLink>
                )}
              </MenuItem>
            </Menu>
          </Hidden>
          {/* TODO <Typography variant="subtitle1">EN | DE</Typography> */}
        </Box>
        {/* desktop / tablet  nav */}
        <Toolbar className={classes.toolbar}>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            alignItems="center"
          >
            <Hidden xsDown>
              <MenuList className={classes.left} disableListWrap>
                <MenuItem>
                  <RouterLink
                    to="/simulation"
                    activeClassName={classes.navLink}
                    className={classes.title}
                  >
                    Simulation
                  </RouterLink>
                </MenuItem>
                <MenuItem>
                  <RouterLink
                    to="/categories"
                    activeClassName={classes.navLink}
                    className={classes.title}
                  >
                    Train by category
                  </RouterLink>
                </MenuItem>
              </MenuList>
            </Hidden>
            {/* Logo  */}
            <Link component={RouterLink} to="/" className={classes.middle}>
              <Logo className={classes.logo} />
            </Link>
            <Hidden xsDown>
              <MenuList className={classes.right}>
                <MenuItem>
                  {user ? (
                    <RouterLink
                      to="/dashboard"
                      activeClassName={classes.navLink}
                      className={classes.title}
                    >
                      Dashboard
                    </RouterLink>
                  ) : (
                    <RouterLink
                      to="/about"
                      activeClassName={classes.navLink}
                      className={classes.title}
                    >
                      About us
                    </RouterLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {user ? (
                    <RouterLink
                      to="/"
                      className={classes.title}
                      onClick={() => {
                        logout();
                        setUser();
                      }}
                    >
                      Logout
                    </RouterLink>
                  ) : (
                    <RouterLink
                      to="/login"
                      activeClassName={classes.navLink}
                      className={classes.title}
                    >
                      Login
                    </RouterLink>
                  )}
                </MenuItem>
              </MenuList>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    boxShadow: 'none',
    padding: '2rem 0',
    '& a': {
      color: '#ffffff',
      fontWeight: 700,
      textDecoration: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    outline: 'none',
  },
  middle: {
    display: 'flex',
    justifyContent: 'center',
    width: '30%',
  },
  [theme.breakpoints.down('xs')]: {
    middle: {
      width: '100%',
    },
  },
  logo: {
    height: '2%',
    width: '15%',
  },

  right: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    outline: 'none',
  },
  languages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 2rem',
  },
  [theme.breakpoints.up('sm')]: {
    languages: {
      justifyContent: 'flex-end',
    },
  },
  mobileMenu: {
    '& ul': {
      backgroundColor: '#232F37',
      color: '#ffffff',
      padding: '0',
      width: '100vh',
    },
    '& a': {
      fontWeight: 700,
    },
  },
  navLink: {
    color: '#d75f5f !important',
  },
}));
