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





const useStyles = makeStyles((theme) => ({

    mainContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.23)",
        color: "#ffffff",
        borderRadius: 16,
        // opacity: 0.13,

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

    input: {
        color: "#d7e360",
        //     '&$focused': {
        //         border: "1px solid red",
        //     },
        //     color: "#B0F54D",
        // },
        // focused: {
        //     border: "1px solid red",
    },



    inputBase: {
        border: "1px solid red",
        borderRadius: 3,
        height: "8vh",
    },


    signIn: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#d75f5f",
        color: "#ffffff",
        focus: {
            color: '#000000'
        }
    },

    signUp: {
        margin: theme.spacing(3, 0, 2),
        // backgroundColor: "#d75f5f",
        color: "#ffffff",
    },
}));



const LogIn = () => {
    const classes = useStyles();

    return (
        <Container className={classes.mainContainer} component="main" maxWidth="xs">
            <CssBaseline />
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






                    {/* <InputBase
                        className={classes.inputBase}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    /> */}








                    <TextField
                        className={classes.focused}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="#ffffff" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.signIn}
                    >
                        LOGIN
                     </Button>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                             </Link>
                    </Grid>
                    <Divider />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.signUp}
                    >
                        SIGN UP
                     </Button>
                </form>
            </div>

        </Container>
    );
}

export default LogIn;