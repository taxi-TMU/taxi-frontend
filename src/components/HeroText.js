import { Link as RouterLink } from "react-router-dom";
import { Button, Typography, Box, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const HeroText = () => {
  const classes = useStyle();

  return (
    <Box className={classes.heroBox}>
      <Typography
        component="h2"
        gutterBottom
        variant="h2"
        color="textSecondary"
        fontWeight={700}
      >
        TMU App
      </Typography>
      <Typography component="p" color="textSecondary">
        The taxi/rental car enterprise learning App (TMU) is an App with which
        you can playfully prepare for the specialist examination in taxi/rental
        cars at the german chamber of industry and commerce(IHK). You have the
        option to train in specific categories /sub-categories or to simulate an
        IHK exam including all categories. The aim of TMU App is to educate and
        prepare you for the real exam.
      </Typography>
      <Box
        className={classes.heroButtonBox}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={5}
      >
        <Link component={RouterLink} to="/training">
          <Button
            className={classes.heroButton}
            color="primary"
            variant="contained"
          >
            Try it now
          </Button>
        </Link>
        <Link component={RouterLink} to="/signup">
          <Button className={classes.heroButton} variant="outlined">
            Register
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default HeroText;

const useStyle = makeStyles((theme) => ({
  heroBox: {
    padding: "3rem 0",
    "& a:hover": {
      textDecoration: "none",
    },
  },
  heroButton: {
    width: "9rem",
    height: "3.5rem",
    padding: 0,
  },
  [theme.breakpoints.up("sm")]: {
    heroButtonBox: {
      justifyContent: "start",
    },
    heroButton: {
      width: "13rem",
      marginRight: "2rem",
    },
  },
  [theme.breakpoints.up("md")]: {
    heroBox: {
      width: "60%",
      paddingLeft: "4rem",
    },
  },
  [theme.breakpoints.up("lg")]: {
    heroBox: {
      width: "40%",
      paddingLeft: "6rem",
    },
  },
}));