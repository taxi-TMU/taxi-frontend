import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Container, Button } from "@material-ui/core";

const SelectCategory = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          TEST RESULTS
        </Typography>

        <Typography className={classes.padding}>
          Placeholder for test result content.{" "}
        </Typography>
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
