import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
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
    height: '10%',
    width: '25%',
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
}));

const Nav = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const menu = useRef();

  const handleOpenMenu = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <Box ref={menu}>
      <AppBar className={classes.root} position="static">
        <Box className={classes.languages}>
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
                <Link className={classes.title}>Quiz</Link>
              </MenuItem>
              <MenuItem>
                <Link className={classes.title}>Categories</Link>
              </MenuItem>
              <MenuItem>
                <Link className={classes.title}>About</Link>
              </MenuItem>
              <MenuItem>
                <Link className={classes.title}>Login</Link>
              </MenuItem>
            </Menu>
          </Hidden>
          <Typography>EN | DE</Typography>
        </Box>
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
                  <Link className={classes.title}>Quiz</Link>
                </MenuItem>
                <MenuItem>
                  <Link className={classes.title}>Categories</Link>
                </MenuItem>
              </MenuList>
            </Hidden>
            <Box className={classes.middle}>
              <Logo className={classes.logo} />
            </Box>
            <Hidden xsDown>
              <MenuList className={classes.right}>
                <MenuItem>
                  <Link className={classes.title}>About</Link>
                </MenuItem>
                <MenuItem>
                  <Link className={classes.title}>Login</Link>
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