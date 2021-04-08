import React, { useState } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import taxiAppBg from "./images/taxi-bg.png";
import HeroText from "./components/HeroText";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Login from "./components/LogIn";
import PasswordRequest from "./components/PasswordRequest";
import PasswordReset from "./components/PasswordReset";
import SignUp from "./components/SignUp";
import { loginUser } from "./utils/auth";

const useStyle = makeStyles((theme) => ({
  headerBg: (props) => ({
    background: props.background,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    border: "3px solid #a3ccc3",
  }),
  mainSpace: {
    padding: "0 1rem 6rem 1rem",
  },
  [theme.breakpoints.up("sm")]: {
    mainSpace: {
      padding: "0 2rem 8rem 2rem",
    },
  },
  [theme.breakpoints.up("lg")]: {
    mainSpace: {
      padding: "0 2rem 10rem 2rem",
    },
  },
}));

const App = () => {
  const { pathname } = useLocation();
  const [credentials, setCredentials] = useState();

  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuthentication = async (e) => {
    e.preventDefault();
    loginUser(credentials);
    // try {
    //   const result = await axios.post(
    //     `${process.env.REACT_APP_SERVER_URL}/login`,
    //     {
    //       email: credentials.email,
    //       password: credentials.password,
    //     }
    //   );
    //   console.log(result);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  const props = {
    background:
      pathname === "/"
        ? `linear-gradient(rgba(35, 47, 55, 0.61), rgba(35, 47, 55, 0.61)),  url(${taxiAppBg})`
        : "#232f37",
  };
  const classes = useStyle(props);

  return (
    <>
      <Container disableGutters maxWidth="xl">
        <Box className={classes.headerBg}>
          <Box component="header">
            <Nav />
          </Box>
          <Box component="main" className={classes.mainSpace}>
            <Switch>
              <Route path="/" exact>
                <HeroText />
              </Route>
              <Route path="/login">
                <Login
                  onLogin={handleAuthentication}
                  onSetCredentials={handleSetCredentials}
                />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/reset/request">
                <PasswordRequest />
              </Route>
              <Route path="/reset/update">
                <PasswordReset />
              </Route>
              <Redirect to="/" exact />
            </Switch>
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default App;
