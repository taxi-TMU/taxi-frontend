import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Logo } from "../images/logo.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: 'transparent',
        boxShadow: 'none',

    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",

    },
    left: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "40%",
    },
    middle: {
        display: "flex",
        justifyContent: "center",
        width: "20%",
    },
    logo: {
        height: "10%",
        width: "25%",
    },

    right: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "20%",
    },
    languages: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "20%",
    },
    langDivider: {
        marginRight: 4,
        marginLeft: 4,
    },

}));

const NewNav = () => {
    const classes = useStyles();

    return (
        <div >
            <AppBar className={classes.root} position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}>
                        <Typography variant="h6" className={classes.title}>
                            Demo</Typography>
                        <Typography variant="h6" className={classes.title}>
                            Quiz</Typography>
                        <Typography variant="h6" className={classes.title}>
                            Categories</Typography>
                    </div>
                    <div className={classes.middle}>
                        <Logo className={classes.logo} />
                    </div>


                    <div className={classes.right}>
                        <Typography variant="h6" className={classes.title}>
                            About</Typography>
                        <Typography variant="h6" className={classes.title}>
                            Login</Typography>
                    </div>
                    <div className={classes.languages}>
                        <Typography>EN</Typography>
                        <Typography className={classes.langDivider}> | </Typography>
                        <Typography>DE</Typography>

                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NewNav;