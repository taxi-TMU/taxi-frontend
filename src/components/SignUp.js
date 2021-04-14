import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Divider,
  Box
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    color: "#ffffff",
    borderRadius: 16,
    border: 2,
    borderColor: "primary",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#d75f5f",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    "& label": {
      color: "#333",
    },
  },
  divider: {
    backgroundColor: " #ffffff",
  },
  loginBtn: {
    color: "secondry",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
}));


const SignUp = ({ onRegister, onSetUserInput, isError, isSuccess }) => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrieren
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
            id="first_name"
            label="Vorname"
            name="first_name"
            autoFocus
            onChange={onSetUserInput}
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Nachname"
            name="last_name"
            onChange={onSetUserInput}
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
            onChange={onSetUserInput}
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            id="password"
            label="Passwort"
            name="password"
            type="password"
            required
            fullWidth
            onChange={onSetUserInput}
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            id="Repeat password"
            label="Passwort wiederholen"
            name="repeat password"
            type="password"
            required
            fullWidth
            onChange={onSetUserInput}
          />

          <Button
            onClick={onRegister}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Registrieren
          </Button>
          <br />
          <br />

          <Grid item xs>
            <Typography component="p" color="textSecondary">
            Sie haben bereits ein Konto?
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
              Zum Login
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
