import { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';
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
  Box,
  CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  AccessTime,
  CheckCircle,
  CheckCircleOutlineOutlined,
  Error,
  FiberManualRecord,
} from '@material-ui/icons';
import { getRequest } from '../utils/api';

const Result = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [result, setResults] = useState();
  const [rightAnswers, setRightAnswers] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await getRequest(`training/${id}`);
        countAnswers(res);
        countTime(res);
        setResults(res);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [id]);

  const countAnswers = (result) => {
    console.log(result);
    result.questions.forEach((res) => {
      if (res.answeresRight) setRightAnswers((prevState) => prevState + 1);
    });
  };

  const countTime = (result) => {
    const time_end = moment(result.time_end);
    const time_start = moment(result.time_start);
    const min = time_end.diff(time_start, 'minutes');
    const sec = Math.floor(time_end.diff(time_start) / 1000);
    setTime(moment(`${min}:${sec}`, 'mm:ss').format('mm:ss'));
  };

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="lg">
      <Typography
        component="h2"
        variant="h4"
        align="center"
        className={classes.resultTitle}
      >
        Testergebnisse
      </Typography>
      <Divider className={classes.divider} />
      {loading && (
        <Box py={4} textAlign="center">
          <CircularProgress color="primary" />
        </Box>
      )}
      {result && (
        <Grid
          container
          spacing={3}
          alignItems="center"
          className={classes.padding}
        >
          <Grid container item xs={6} alignItems="center" justify="center">
            <Box
              className={classes.resultBox}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              boxShadow={4}
              borderRadius={4}
            >
              <CheckCircleOutlineOutlined fontSize="large" />
              <Typography component="h4" variant="h6">
                Fehler
              </Typography>
              <Typography className={classes.resultSummaryText}>
                {rightAnswers}/{result.questions.length}
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={6} direction="column" alignItems="center">
            <Box
              className={classes.resultBox}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              boxShadow={4}
              borderRadius={4}
            >
              <AccessTime fontSize="large" />
              <Typography component="h4" variant="h6">
                Benötigte Zeit
              </Typography>
              <Typography className={classes.resultSummaryText}>
                {time}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      {result &&
        result.questions.map((res, index) => {
          return (
            <Accordion key={index} className={classes.accordion}>
              <AccordionSummary
                className={classes.accordionIcon}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {res.answeresRight ? (
                  <CheckCircle className={classes.right} />
                ) : (
                  <Error className={classes.wrong} />
                )}
                <Typography>{res.question_text}</Typography>
              </AccordionSummary>
              <AccordionDetails
                key={index}
                className={classes.accordionSubTitleBox}
              >
                <Grid container>
                  <Grid
                    container
                    item
                    xs={1}
                    justify="center"
                    className={classes.accordionSubTitle}
                  >
                    Your Answer
                  </Grid>
                  <Grid
                    container
                    item
                    xs={1}
                    justify="center"
                    className={classes.accordionSubTitle}
                  >
                    Answer
                  </Grid>
                  <Grid item xs={10} className={classes.accordionSubTitle}>
                    Question
                  </Grid>
                </Grid>
              </AccordionDetails>
              {res.answers.map((ans, index) => {
                return (
                  <AccordionDetails key={index}>
                    <Grid container>
                      <Grid container item xs={1} justify="center">
                        {ans.userAnswer ? (
                          <FiberManualRecord className={classes.right} />
                        ) : (
                          <FiberManualRecord className={classes.wrong} />
                        )}
                      </Grid>
                      <Grid container item xs={1} justify="center">
                        {ans.checked ? (
                          <FiberManualRecord className={classes.right} />
                        ) : (
                          <FiberManualRecord className={classes.wrong} />
                        )}
                      </Grid>
                      <Grid item xs={10}>
                        <Typography>{ans.text}</Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                );
              })}
            </Accordion>
          );
        })}
      <Box py={6} display="flex" justifyContent="center">
        <Link component={RouterLink} to="/dashboard">
          <Button variant="contained" color="primary">
            Zurück zum Dashboard
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Result;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    color: '#ffffff',
    borderRadius: 16,
    border: '1px solid white',
    borderColor: 'primary',
    '& a:hover': {
      textDecoration: 'none',
    },
  },
  resultTitle: {
    padding: '2rem',
  },
  padding: {
    padding: 50,
  },
  resultBox: {
    backgroundColor: '#232F37',
    color: theme.palette.secondary.main,
    width: '10rem',
    height: '10rem',
  },
  resultSummaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  divider: {
    backgroundColor: ' #ffffff',
  },
  accordion: {
    textAlign: 'left',
    width: '100%',
    backgroundColor: '#232F37',
    color: '#fff',
  },
  accordionIcon: {
    '& span': {
      color: '#fff !important',
    },
  },
  accordionSubTitleBox: {
    borderBottom: '1px solid #a3ccc3',
  },
  accordionSubTitle: {
    color: theme.palette.secondary.main,
    fontWeight: '700',
  },
  right: {
    margin: '0 1rem',
    color: 'green',
  },
  wrong: {
    margin: '0 1rem',
    color: 'red',
  },
}));
