import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { NoEncryption } from '@material-ui/icons';





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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#d75f5f",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },

    divider: {
        backgroundColor: " #ffffff",

    },
    loginBtn: {
        color: "secondry",
    },
    input: {
        backgroundColor: " #ffffff",
        borderRadius: 6,
    },

}));



const SignUp = () => {
    const classes = useStyles();

    return (
        <Container className={classes.mainContainer} component="main" maxWidth="xs">
            <CssBaseline />
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
                        placeholder="First name"
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
                        placeholder="Last name"
                        name="last name"
                    />
                    <TextField
                        className={classes.input}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        className={classes.input}
                        variant="filled"
                        margin="normal"
                        id="password"
                        placeholder="Password"
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
                        placeholder="Repeat password"
                        name="repeat password"
                        type="password"
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        SIGN UP
                    </Button>< br />< br />

                    <Grid item xs>
                        <Link href="#" color="textSecondary" >
                            Already have an account
                        </Link>
                    </Grid>< br />
                    <Divider className={classes.divider} />
                    < br />

                    <Button
                        className={classes.loginBtn}
                        type="submit"
                        fullWidth
                        variant="outlined"

                    >LOGIN
                    </Button>
                    < br />< br />< br />
                </form>
            </div>
        </Container>
    );
}

export default SignUp;
