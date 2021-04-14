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
        <Typography component="h1" variant="h5">
          Simulation starten
        </Typography>

        <Typography className={classes.padding}>
          In diesem Abschnitt können Sie eine Prüfung simulieren.
          Bitte beachten Sie, dass Sie die Simulation nicht pausieren oder später dazu zurück kommen können.
          Sie haben 20 Minuten Zeit, alle Fragen zu beantworten und die Simulation zu beenden.
          Unbeantwortete Fragen werden als falsch markiert.{" "}
        </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onClickCreateSimulation}
          >
            Starte Simulation
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
