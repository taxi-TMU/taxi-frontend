import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
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

const PasswordReset = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <br />
        <Typography component="h1" variant="h5">
          RESET PASSWORD
        </Typography>
        <br />
        <br />

        <form className={classes.form} noValidate>
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New password (8 charaters min.)"
            name="newpassword"
            autoFocus
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Confirm new password"
            name="newpassword"
          />
          <br />
          <br />
          <Button type="submit" fullWidth variant="contained" color="primary">
            RESET PASSWORD
          </Button>
          <br />
          <br />
          <br />
        </form>
      </div>
    </Container>
  );
};

export default PasswordReset;
