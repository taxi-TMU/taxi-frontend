import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Box, Typography, Grid, CircularProgress } from '@material-ui/core';
import { getRequest } from '../utils/api';
import { makeStyles } from '@material-ui/core/styles';

const Statistics = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [statistics, seStatistics] = useState();

  
  useEffect(() => {
    const id = user.id || user._id;
    const getData = async () => {
      const res = await getRequest(`training/stats/${id}`);
      seStatistics(res);
    };
    getData();
  }, [user]);

  if (user && statistics) {
    return (
      <>
        <Typography
          component="h2"
          variant="h5"
          align="center"
          color="textPrimary"
          className={classes.dashboardTitle}
        >
          Statistiken{' '}
        </Typography>
        <Grid
          container
          spacing={3}
          alignItems="center"
          className={classes.padding}
        >
          <Grid container item lg={4} alignItems="center" justify="center">
            <Box
              className={classes.resultBox}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              boxShadow={4}
              borderRadius={4}
            >
              <Typography component="h4" variant="h6">
                Gesamtzahl Tests
              </Typography>
              <Typography className={classes.resultSummaryText}>
                {statistics.total}
              </Typography>
            </Box>
          </Grid>
          <Grid container item lg={4} alignItems="center" justify="center">
            <Box
              className={classes.resultBox}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              boxShadow={4}
              borderRadius={4}
            >
              <Typography component="h4" variant="h6">
                Bestandene Simulationen
              </Typography>
              <Typography className={classes.resultSummaryText}>
                {statistics.simulations.passed} /{' '}
                {statistics.simulations.total_simulations}
              </Typography>
            </Box>
          </Grid>
          <Grid container item lg={4} alignItems="center" justify="center">
            <Box
              className={classes.resultBox}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              boxShadow={4}
              borderRadius={4}
            >
              <Typography component="h4" variant="h6">
                Bestandene Übungen
              </Typography>
              <Typography className={classes.resultSummaryText}>
                {statistics.trainings.passed} /{' '}
                {statistics.trainings.total_trainings}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <Box py={4} textAlign="center">
        <CircularProgress color="primary" />
      </Box>
    );
  }
};

export default Statistics;

const useStyles = makeStyles((theme) => ({
  dashboardBox: {
    padding: '2rem',
    margin: '2rem auto',
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    border: '2px solid #fff',
    color: '#fff',
    borderRadius: 10,
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
  },
  dashboardTitle: {
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#fff',
    padding: 5,
  },

  resultTitle: {
    padding: '2rem',
  },
  padding: {
    padding: 20,
  },
  resultBox: {
    backgroundColor: '#232F37',
    color: theme.palette.secondary.main,
    width: '20rem',
    height: '7rem',
  },
  resultSummaryText: {
    color: '#fff',
    fontWeight: '700',
  },
}));
