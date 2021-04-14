import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Divider,
  Link,
} from "@material-ui/core";

const PasswordRequest = ({ onSetUserInput, onRequestPassword }) => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Passwort vergessen
        </Typography>
        <br/>
        <Typography>
          Bitte geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen
          Anweisungen zum Zurücksetzen Ihres Passworts.
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
            onChange={(e) => onSetUserInput(e)}
          />
          <br />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onRequestPassword}
          >
            Passwort zurück setzen
          </Button>
          <br />
          <br />
          <Typography component="p" variant="subtitle1">
            Haben Sie bereits Login und Passwort?
          </Typography>
          <br />
          <Divider className={classes.divider} />
          <br />
          <Link component={RouterLink} to="/login">
            <Button type="submit" fullWidth variant="outlined">
              Zurück um Login
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

export default PasswordRequest;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    color: "#ffffff",
    borderRadius: 16,
    "& a": {
      color: "#fff",
    },
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
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
}));
