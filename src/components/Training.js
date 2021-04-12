import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Question from './Question';

import {
  //   Link,
  Typography,
  Container,
  //   Button,
} from "@material-ui/core";
import Countdown from "react-countdown";
import { getRequest } from "../utils/api";

const SelectCategory = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [training, setTraining] = useState();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getRequest(`training/${id}`);
      setTraining(data);
      data.question_set.map((question) => getQuestions(question));

      setLoading(false);
    };
    getData();
  }, [id]);

  const getQuestions = async (question_id) => {
    const q = await getRequest(`question/${question_id}`);
    console.log(q);
    setQuestions((prevData) => [...prevData, q]);
  };

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="lg">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Training
        </Typography>

        {loading && (
          <Typography component="h1" variant="h5">
            Loading ...
          </Typography>
        )}

        {training && (
          <>
            <br />
            {training.simulation && <Countdown date={training.time_end} />}
            <br />
            <Typography component="h1" variant="h5">
              Test is there
            </Typography>
            {questions &&
              questions.map((question) => {
                return <Question {...question} />;
              })}
          </>
        )}

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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },

  padding: {
    padding: 50,
  },
}));
