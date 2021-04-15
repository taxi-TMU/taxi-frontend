import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const PasswordReset = ({ onSetUserInput, onResetPassword }) => {
  let { userId, token } = useParams();

  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <br />
        <Typography component="h1" variant="h5">
          Passwort zurück setzen
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
            label="Neues Passwort (Mind. 8 Zeichen)"
            name="password"
            autoFocus
            onChange={(e) => onSetUserInput(e)}
          />
          <TextField
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="password_repeat"
            label="Passwort bestätigen"
            name="password_repeat"
            onChange={(e) => onSetUserInput(e)}
          />
          <br />
          <br />
          <Button
            onClick={(e) => {
              onResetPassword(e, userId, token);
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Passwort zurück setzen
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

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    color: "#ffffff",
    borderRadius: 16,
    border: '2px solid white',
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
