import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Typography,
  Container,
  Button,
  Divider,
  Grid,
} from '@material-ui/core';
import { AccessTime, ErrorOutline, StarOutline } from '@material-ui/icons';

const SelectCategory = () => {
  const { state } = useLocation();
  const classes = useStyles();

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="lg">
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          TEST RESULTS
        </Typography>

        <Divider className={classes.divider} />
        <Grid
          container
          spacing={3}
          alignItems="center"
          className={classes.padding}
        >
          <Grid item xs={4} alignItems="center">
            <ErrorOutline fontSize="large" />
            <Typography>Errors</Typography>
            <Typography>03/18</Typography>
          </Grid>

          <Grid item xs={4} alignItems="center">
            <AccessTime fontSize="large" />
            <Typography>Current time</Typography>
            <Typography>18.5min</Typography>
          </Grid>

          <Grid item xs={4} alignItems="center">
            <StarOutline fontSize="large" />
            <Typography>Best time</Typography>
            <Typography>15.5min</Typography>
          </Grid>
        </Grid>
        <Link component={RouterLink} to="/dashboard">
          <Button variant="contained" color="primary">
            Back to Dashboard
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
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    color: '#ffffff',
    borderRadius: 16,
    border: '1px solid white',
    borderColor: 'primary',
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  padding: {
    padding: 50,
  },
  divider: {
    backgroundColor: ' #ffffff',
  },
}));
