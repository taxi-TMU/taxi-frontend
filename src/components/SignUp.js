import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    color: '#ffffff',
    borderRadius: 16,
    border: 2,
    borderColor: 'primary',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#d75f5f',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    '& label': {
      color: '#333',
    },
  },
  divider: {
    backgroundColor: ' #ffffff',
  },
  loginBtn: {
    color: 'secondry',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
}));

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SIGN UP
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="first name"
            label="First name"
            name="first name"
            autoFocus
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="last name"
            label="Last name"
            name="last name"
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            id="password"
            label="Password"
            name="password"
            type="password"
            required
            fullWidth
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            id="Repeat password"
            label="Repeat password"
            name="repeat password"
            type="password"
            required
            fullWidth
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            SIGN UP
          </Button>
          <br />
          <br />

          <Grid item xs>
            <Typography component="p" color="textSecondary">
              Already have an account?
            </Typography>
          </Grid>
          <br />
          <Divider className={classes.divider} />
          <br />
          <Link component={RouterLink} to="/login">
            <Button
              className={classes.loginBtn}
              type="submit"
              fullWidth
              variant="outlined"
            >
              LOGIN
            </Button>
          </Link>
          <br />
          <br />
          <br />
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
