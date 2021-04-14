import { Link as RouterLink } from 'react-router-dom';
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
  Box,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    color: '#ffffff',
    borderRadius: 16,
    '& a:hover': {
      textDecoration: 'none',
    },
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

const Login = ({ onLogin, onSetUserInput, isError, isSuccess }) => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        {isError.error &&
          isError.errorMsg.map((err, index) => (
            <Box width="100%" py={2} key={index}>
              <Alert variant="filled" severity="error">
                {err.param}: {err.msg}
              </Alert>
            </Box>
          ))}
        {isSuccess.success && (
          <Box width="100%" py={2}>
            <Alert variant="filled" severity="success">
              {isSuccess.successMsg}
            </Alert>
          </Box>
        )}
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
            onChange={(e) => onSetUserInput(e)}
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
            onChange={(e) => onSetUserInput(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Angemeldet belieben"
            className={classes.checkbox}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onLogin}
          >
            Einloggen
          </Button>
          <br />
          <br />

          <Grid item xs>
            <Link
              component={RouterLink}
              to="/reset/request"
              color="textSecondary"
            >
              Passwort vergessen?
            </Link>
          </Grid>
          <br />
          <Divider className={classes.divider} />
          <br />
          <Link component={RouterLink} to="/signup">
            <Button type="submit" fullWidth variant="outlined">
              Registrieren
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

export default Login;
