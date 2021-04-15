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
import Countdown from 'react-countdown';
import { getRequest } from '../utils/api';
import { updateTrainingOrSimulation } from '../utils/training';
import { useHistory } from 'react-router-dom';

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
}));

export default function Training() {
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
        const training = await getRequest(`training/${id}`);
        setTraining(training)
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [id]);


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
    await updateTrainingOrSimulation(training);
    history.push(`/result/${training._id}`);
  };

  return (
    <>
      {loading && (
        <Box textAlign="center" pb={6}>
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
              {training.simulation && <Countdown date={training.time_end} />}
              <Box py={4} px={2}>
                <Typography component="h4" variant="h4">
                  {training.questions[activeStep].question_text}
                </Typography>
              </Box>
              <Box py={4} px={12} alignSelf="flex-start">
                {training.questions[activeStep].answers.map((answer) => (
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
          </Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
            width="100%"
          >
            {activeStep === training.questions.length ? (
              <Button onClick={handleReset}>Zurücksetzen</Button>
            ) : (
              <>
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
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
}
