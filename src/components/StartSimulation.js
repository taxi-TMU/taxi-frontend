
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
} from "@material-ui/core";
import { getRequest } from "../utils/api";
import { createTraining } from "../utils/training";

const SelectCategory = () => {
  const classes = useStyles();


  return (
    <Container className={classes.mainContainer} component="main" maxWidth="lg">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          START A SIMULATION
        </Typography>

        <Typography className={classes.padding}>
          In this section you can start a simulation.{" "}
        </Typography>

        

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

}));

