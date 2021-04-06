import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
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
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  divider: {
    backgroundColor: ' #ffffff',
  },
  checkbox: {
    color: '#fff',
    '& span': {
      color: '#fff',
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <form className={classes.form} noValidate>
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
            autoFocus
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
            className={classes.checkbox}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            LOGIN
          </Button>
          <br />
          <br />

          <Grid item xs>
            <Link href="#" color="textSecondary">
              Forgot password?
            </Link>
          </Grid>
          <br />
          <Divider className={classes.divider} />
          <br />

          <Button type="submit" fullWidth variant="outlined">
            SIGN UP
          </Button>
          <br />
          <br />
          <br />
        </form>
      </div>
    </Container>
  );
};

export default Login;
