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
}));



const Login = () => {
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
                    <TextField
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        LOGIN
                    </Button>< br />< br />

                    <Grid item xs>
                        <Link href="#" color="textSecondary" >
                            Forgot password?
                        </Link>
                    </Grid>
                    < br />
                    <Divider />< br />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >SIGN UP
                    </Button>
                    < br />< br />< br />
                </form>
            </div>
        </Container>
    );
}

export default Login;