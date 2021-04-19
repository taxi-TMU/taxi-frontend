import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container, Avatar } from "@material-ui/core";
import massimiliano from "../images/massimiliano.png";
import alicia from "../images/alicia.jpg";
import reza from "../images/rezaHajipour.png";

const About = () => {
  const classes = useStyles();

  return (
    <Container className={classes.aboutMain} maxWidth="lg">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          About us
        </Typography>
        <Typography className={classes.padding}>
          Taxi/Mietwagen Unternehme Lern App (TMU)
          <br />
          <br /> The TMU itself is an app that allows users to take quizzes on
          various topics that they can choose between. It simulates an exam that
          is taken at the german chamber of industry and commerce(IHK). With the
          TMU, you can playfully prepare for the specialist examination in taxi
          / rental car traffic at the IHK. The app is web-based and therefore
          runs on all common platforms and devices. Regarding the aim and
          purpose of application, it is meant to be a means for educational
          purposes.
        </Typography>
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
            <Avatar
              alt="Reza"
              src={reza}
              className={classes.avatar}
              variant="rounded"
            />
            <Typography>
              Frontend Web Developer able to build web applications from the
              ground up, planning, design and development. Moderate knowledge
              and experience with JavaScript, CSS, React.js. Good knowledge of
              Html5 and CSS framework like Bootstrap and Material UI. With 20+
              years of visual storytelling experience producing, directing,
              filming and editing.
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <Typography component="h1" variant="h5">
              Alicia Schonefeld{" "}
            </Typography>
            <Typography>Fullstack Developer</Typography>
            <Avatar
              alt="alicia"
              src={alicia}
              className={classes.avatar}
              variant="rounded"
            />
            <Typography>
              Entusiastic full stack web developer with a passion for the
              backend. <br />
              Driven by curiosity, proactive, self-motivated and a team player.
              Gaining a little knowledge each day, always looking for a chance
              of self-improvement and keeping an eye on what's next. Good
              knowledge of Django, Python, React, JavaScript, Express, Linux.
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <Typography component="h1" variant="h5">
              Massimiliao Rizzuto
            </Typography>
            <Typography>Fullstack Developer</Typography>
            <Avatar
              alt="massimiliano"
              src={massimiliano}
              className={classes.avatar}
              variant="rounded"
            />
            <Typography>
              A detail-oriented Web Developer with three years of hands-on
              experience efficiently coding websites. Constantly seeking
              learning opportunities, following industry’s trends and
              advancements. I’ve recently upskilled my knowledge in JavaScript,
              React, Node.js and Express.js. Focus on elegant solutions and
              user’s needs and endless curiosity - these are three things I can
              promise to my future team.
            </Typography>
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
  aboutMain: {
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    color: "#ffffff",
    borderRadius: 16,
    border: "2px solid white",
    "& a:hover": {
      textDecoration: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  padding: {
    padding: 20,
    display: "flex",
    // flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
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
    width: "15rem",
    height: "15rem",
    // backgroundColor: 'white',
    margin: 20,
  },
}));
