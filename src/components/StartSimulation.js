import { makeStyles } from "@material-ui/core/styles";
import { getRequest } from "../utils/api";
import { createTraining } from "../utils/training";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Container, Button } from "@material-ui/core";

const SelectCategory = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          START A SIMULATION
        </Typography>

        <Typography className={classes.padding}>
          In this section you can start a simulation. Please be aware that you
          cannot pause and come back later. You will have 20Minutes of time to
          complete the simulation. Unanswered questions, will be then marked as
          wrong.{" "}
        </Typography>
        <Link component={RouterLink} to="/training/123">
          <Button variant="contained" color="primary">
            START SIMULATION
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
