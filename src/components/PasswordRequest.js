import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
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
  divider: {
    backgroundColor: ' #ffffff',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
}));

const PasswordRequest = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot your password
        </Typography>
        <Typography component="h1" variant="subtitle1">
          Enter your email address and we will send you instructions to reset
          your password.
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
          <br />
          <br />
          <Button type="submit" fullWidth variant="contained" color="primary">
            RESET MY PASSWORD
          </Button>
          <br />
          <br />
          <br />
          <Divider className={classes.divider} />
          <br />
          <Typography component="h1" variant="subtitle1">
            Alread have login and password?{' '}
          </Typography>
          <Typography component="h1" variant="subtitle1">
            BACK TO LOGIN
          </Typography>

          <br />
        </form>
      </div>
    </Container>
  );
};

export default PasswordRequest;
