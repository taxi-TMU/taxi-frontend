import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Link,
  Grid,
  Typography,
  Container,
  Avatar,
  Box,
} from "@material-ui/core";

const About = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} maxWidth="lg">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Über uns
        </Typography>
        <Typography className={classes.padding}>BLABLABLABLA</Typography>
        <Typography component="h1" variant="h5">
          Team
        </Typography>
        <Grid
          container
          spacing={3}
          alignItems="center"
          className={classes.padding}
        >
          <Grid item xs={4} className={classes.gridItem}>
            <Typography component="h1" variant="h5">
              Reza Hijapour
            </Typography>
               
            <Typography>Frontend Developer & Founder</Typography>
            <Avatar alt="Reza" src="/img/reza.png" className={classes.avatar} variant="rounded"/>

          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <Typography component="h1" variant="h5">
              Massimiliao Rizzuto{" "}
            </Typography>
            <Typography>Fullstack Developer</Typography>
            <Avatar alt="Reza" src="/img/massimiliano.jpg" className={classes.avatar} variant="rounded"/>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <Typography component="h1" variant="h5">
              Alicia Schonefeld
            </Typography>
            <Typography>Fullstack Developer</Typography>
            <Avatar alt="Reza" src="/img/alicia.jpg" className={classes.avatar} variant="rounded"/>
          </Grid>
        </Grid>

        <br />
        <br />
      </div>
    </Container>
  );
};

export default About;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    color: "#ffffff",
    borderRadius: 16,
    border: "2px solid white",
    "& a:hover": {
      textDecoration: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  padding: {
    padding: 50,
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  avatar: {
    width: '15rem',
    height: '15rem',
    // backgroundColor: 'white',
    margin: 20
  }
}));
