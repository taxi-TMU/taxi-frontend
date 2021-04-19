import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Container, Button } from "@material-ui/core";
import { createSimulation } from '../utils/training';
import UserContext from '../context/UserContext';


const SelectCategory = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  let history = useHistory();


  const onClickCreateSimulation = async () => {
    const trainingId = await createSimulation(user.id);
    history.push(`/training/${trainingId}`);
  };

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h2" variant="h4">
          Start a simulation
        </Typography>

        <Typography className={classes.padding}>
          In this section you can start a simulation. Please be aware that you
          cannot pause and come back later. You will have 20Minutes of time to
          complete the simulation. Unanswered questions, will be then marked as
          wrong.{" "}
        </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onClickCreateSimulation}
          >
            Start simulation
          </Button>

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
    border: '2px solid white',
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
