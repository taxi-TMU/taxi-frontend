import questionSet from '../data/testdoc.json';
import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Stepper,
  StepLabel,
  Step,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
// import Countdown from 'react-countdown';
// import { Link as RouterLink, useParams } from 'react-router-dom';
// import { getRequest } from '../utils/api';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    color: '#ffffff',
    borderRadius: 16,
    border: '1px solid white',
    borderColor: 'primary',
  },
  trainingButton: {
    width: '14rem',
    height: '3.5rem',
    margin: '0 2rem',
  },
}));

export default function Training() {
  const { user } = useContext(UserContext);
  const [training, setTraining] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  // const [loading, setLoading] = useState();
  // const { id } = useParams();

  useEffect(() => {
    setTraining({
      userId: user.id,
      simulation: false,
      time_start: Date.now(),
      time_end: null,
      question_set: questionSet
        .map((question) => ({
          ...question,
          answers: question.answers.map((answer) => ({
            ...answer,
            userAnswer: false,
          })),
        }))
        .slice(0, 20),
    });
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCheckAnswer = (e, i) => {
    setTraining((prevState) => ({
      ...prevState,
      question_set: prevState.question_set.map((question, index) =>
        index === i
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                e.target.name === answer._id
                  ? { ...answer, userAnswer: !answer.userAnswer }
                  : { ...answer }
              ),
            }
          : { ...question }
      ),
    }));
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {training &&
          training.question_set.map((label, index) => (
            <Step key={index}>
              <StepLabel />
            </Step>
          ))}
      </Stepper>
      <Container className={classes.mainContainer} maxWidth="lg">
        {training && (
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            py={4}
          >
            <Box py={4} px={2}>
              <Typography component="h4" variant="h4">
                {training.question_set[activeStep].question}
              </Typography>
            </Box>
            <Box py={4} px={12}>
              {training.question_set[activeStep].answers.map((answer) => (
                <Box py={2} key={answer._id}>
                  <FormControlLabel
                    key={answer._id}
                    control={
                      <Checkbox
                        onChange={(e) => handleCheckAnswer(e, activeStep)}
                        name={answer._id}
                        checked={answer.userAnswer}
                      />
                    }
                    label={answer.text}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={4}
        width="100%"
      >
        {activeStep === questionSet.length ? (
          <Button onClick={handleReset}>Reset</Button>
        ) : (
          <>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.trainingButton}
            >
              Previous question
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.trainingButton}
            >
              {activeStep === questionSet.length - 1
                ? 'Finish'
                : 'Next question'}
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
