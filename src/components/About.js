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
          Über uns
        </Typography>
        <Typography className={classes.padding}>
          Taxi/Mietwagen Unternehme Lern App (TMU)
          <br />
          <br /> Die TMU selbst ist eine App, mit der Benutzer Quizfragen zu
          verschiedenen Themen durchführen können, zwischen denen sie wählen
          können. Es simuliert eine Prüfung, die in IHK abgelegt wird. Mit der
          TMU können Sie sich spielerisch auf die Fachkundeprüfung im
          Taxi-/Mietwagenverkehr bei der IHK vorbereiten. Die App funktioniert
          webbasiert und läuft somit auf allen gängigen Plattformen bzw.
          Geräten. In Bezug auf das Ziel und den Zweck der Anwendung soll es ein
          Mittel für Bildungszwecke sein.
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
              Entusiastic full stack web developer with a passion for the backend. <br/>
              Driven by curiosity, proactive, self-motivated and a team player.
              Gaining a little knowledge each day, always looking for a chance 
              of self-improvement and keeping an eye on what's next.
              Good knowledge of Django, Python, React, JavaScript, Express, Linux.
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
