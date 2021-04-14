import { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Link,
  Typography,
  Container,
  Button,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AccessTime, ErrorOutline, StarOutline } from "@material-ui/icons";
import { getRequest } from "../utils/api";

const SelectCategory = () => {
  // const { state } = useLocation();
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [result, setResults] = useState();
  const [nrQuestions, setNrQuestions] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getRequest(`training/${id}`);
        setResults(res);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [id]);


  // TODO useEffect(() => {
  //     result && setNrQuestions(result.questions.length)
  //     result && result.questions.map(question => {
  //       if (!question.answeresRight) {
  //         return setWrongAnswers(wrongAnswers+1)
  //       }
  //     })
  // }, [result])


  return (
    <Container className={classes.mainContainer} component="main" maxWidth="lg">
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Testergebnisse
        </Typography>

        <Divider className={classes.divider} />
        <Grid
          container
          spacing={3}
          alignItems="center"
          className={classes.padding}
        >
          <Grid item xs={4}>
            <ErrorOutline fontSize="large" />
            <Typography>Fehler</Typography>
            <Typography>{wrongAnswers && wrongAnswers}/{nrQuestions && nrQuestions}</Typography>
          </Grid>

          <Grid item xs={4}>
            <AccessTime fontSize="large" />
            <Typography>Benötigte Zeit</Typography>
            <Typography>18.5min</Typography>
          </Grid>

          <Grid item xs={4}>
            <StarOutline fontSize="large" />
            <Typography>Bestzeit</Typography>
            <Typography>15.5min</Typography>
          </Grid>
        </Grid>

        {result &&
          result.questions.map((res, index) => {
            return (
              <Accordion key={index} className={classes.accordion}>
                <AccordionSummary
                  className={
                    res.answeresRight
                      ? classes.right
                      : classes.wrong
                  }
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{res.question_text}</Typography>
                </AccordionSummary>
                {res.answers.map((ans, index) => {
                  return (
                    <AccordionDetails
                      key={index}
                      className={
                        ans.checked === ans.userAnswer
                          ? classes.right
                          : classes.wrong
                      }
                    >
                      <Typography>
                        {ans.text}:{" "}
                        {ans.checked === ans.userAnswer ? "Right" : "Wrong"}
                      </Typography>
                    </AccordionDetails>
                  );
                })}
              </Accordion>
            );
          })}
  <br />
        <br />
        <Link component={RouterLink} to="/dashboard">
          <Button variant="contained" color="primary">
            Zurück zum Dashboard
          </Button>
        </Link>

        <br />
        <br />
        <br />
      </div>
    </Container>
  );
};

export default SelectCategory;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    color: "#ffffff",
    borderRadius: 16,
    border: "1px solid white",
    borderColor: "primary",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  padding: {
    padding: 50,
  },
  divider: {
    backgroundColor: " #ffffff",
  },
  accordion: {
    textAlign: "left",
    width: "100%",
  },
  right: {
    borderBottom: '1px solid #e6e6e6',
    background: 'green',
  },
  wrong: {
    borderBottom: '1px solid #e6e6e6',
    background: 'red',
  },
}));
