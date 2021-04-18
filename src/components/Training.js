import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  CircularProgress,
} from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';
import Countdown, { zeroPad } from 'react-countdown';
import { getRequest } from '../utils/api';
import {
  updateTrainingOrSimulation,
  testTrainingResults,
} from '../utils/training';
import { useHistory } from 'react-router-dom';
import decode from 'decode-html';

const Training = ({ testrunmode }) => {
  const [training, setTraining] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let training;
        if (testrunmode) {
          training = await getRequest(`testrun/`);
        } else {
          training = await getRequest(`training/${id}`);
        }
        setTraining(training);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [id, testrunmode]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckAnswer = (e, i) => {
    setTraining((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, index) =>
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

  const saveTrainingAndGetResult = async () => {
    if (testrunmode) {
      const finalRes = await testTrainingResults(training);
      history.push({
        pathname: '/result',
        state: { results: finalRes },
      });
    } else {
      await updateTrainingOrSimulation(training);
      history.push(`/result/${training._id}`);
    }
  };

  const timeDisplay = ({ minutes, seconds, completed }) => {
    if (completed) {
      saveTrainingAndGetResult();
      return (
        <Typography component="h4" variant="h4" color="primary">
          Time is up
        </Typography>
      );
    } else if (minutes < 10) {
      return (
        <Typography component="h4" variant="h4" className={classes.timerEnding}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </Typography>
      );
    } else {
      return (
        <Typography component="h4" variant="h4">
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </Typography>
      );
    }
  };

  return (
    <>
      {loading && (
        <Box textAlign="center" pb={6} height="100vh">
          <CircularProgress color="primary" />
        </Box>
      )}
      {training && (
        <>
          <Stepper activeStep={activeStep} alternativeLabel>
            {training.questions.map((label, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
          <Container className={classes.mainContainer} maxWidth="lg">
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              py={4}
            >
              {training.simulation && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.timerBox}
                  boxShadow={4}
                  p={2}
                  borderRadius={4}
                >
                  <AccessTime fontSize="large" />
                  <Countdown
                    date={training.time_end}
                    renderer={timeDisplay}
                    zeroPadTime="2"
                  />
                </Box>
              )}
              <Box px={2} width="100%">
                <Typography component="h4" variant="h5" align="center">
                  {decode(training.questions[activeStep].question_text)}
                </Typography>
              </Box>
              <Box py={2} px={12} alignSelf="flex-start" width="100%">
                {training.questions[activeStep].answers.map((answer) => (
                  <Box
                    key={answer._id}
                    className={
                      answer.userAnswer
                        ? classes.answerBoxChecked
                        : classes.answerBox
                    }
                    my={2}
                    borderRadius={2}
                    boxShadow={4}
                    px={2}
                  >
                    <FormControlLabel
                      key={answer._id}
                      className={classes.label}
                      control={
                        <Checkbox
                          onChange={(e) => handleCheckAnswer(e, activeStep)}
                          name={answer._id}
                          checked={answer.userAnswer}
                        />
                      }
                      label={decode(answer.text)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
            width="100%"
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={saveTrainingAndGetResult}
              className={classes.trainingExitButton}
            >
              Exit
            </Button>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.trainingButton}
            >
              Zurück
            </Button>
            {activeStep === training.questions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={saveTrainingAndGetResult}
                className={classes.trainingButton}
              >
                Beenden
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.trainingButton}
              >
                Weiter
              </Button>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Training;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    color: '#ffffff',
    borderRadius: 16,
    border: '2px solid white',
  },
  trainingButton: {
    width: '14rem',
    height: '3.5rem',
    margin: '0 2rem',
  },
  trainingExitButton: {
    width: '14rem',
    height: '3.5rem',
    margin: '0 2rem',
    borderColor: theme.palette.secondary.main,
  },
  timerBox: {
    color: theme.palette.secondary.main,
    backgroundColor: '#232F37',
    marginBottom: 15,
  },
  timerEnding: {
    color: theme.palette.error.main,
  },
  label: {
    width: '100%',
    padding: '1rem 0',
  },
  answerBox: {
    backgroundColor: '#232F37',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#000',
    },
  },
  answerBoxChecked: {
    border: '2px solid #a3ccc3',
    backgroundColor: 'rgba(35,47,55, 0.5)',
  },
}));
