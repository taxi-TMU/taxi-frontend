import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
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
import {
  login,
  getUser,
  decodeToken,
  register,
  logout,
  requestPasswordReset,
  resetPassword,
} from "./utils/auth";
import UserContext from "./context/UserContext";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizTest from "./components/QuizTest";

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
  const history = useHistory();
  const { pathname } = useLocation();
  const props = {
    background:
      pathname === "/"
        ? `linear-gradient(rgba(35, 47, 55, 0.61), rgba(35, 47, 55, 0.61)), url(${taxiAppBg})`
        : "#232f37",
  };
  const classes = useStyle(props);

  const [user, setUser] = useState();
  const [userInput, seUserInput] = useState();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const handleSetUserInput = (e) => {
    seUserInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordRequest = async (e) => {
    e.preventDefault();
    await requestPasswordReset(userInput);
  };

  const handlePasswordReset = async (e, userId, token) => {
    e.preventDefault();
    const reset = await resetPassword(userInput, userId, token);
    console.log(reset);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isAuthenticated = await login(userInput);
    if (isAuthenticated) checkIfLoggedIn();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const isAuthenticated = await register(userInput);
    if (isAuthenticated) checkIfLoggedIn();
  };

  const checkIfLoggedIn = async () => {
    const response = await decodeToken();
    let me;
    if (!response) return logout();
    if (response) me = await getUser(response._id);
    setUser(me);
  };

  return (
    <>
      <Container disableGutters maxWidth="xl">
        <UserContext.Provider value={{ user, setUser }}>
          <Box className={classes.headerBg}>
            <Box component="header">
              <Nav />
            </Box>
            <Box component="main" className={classes.mainSpace}>
              <Switch>
                <Route exact path="/">
                  <HeroText />
                </Route>
                <Route exact path="/login">
                  {user ? (
                    <Redirect to="/dashboard" /> // TODO change to dashboard
                  ) : (
                    <Login
                      onLogin={handleLogin}
                      onSetUserInput={handleSetUserInput}
                    />
                  )}
                </Route>
                <Route path="/signup">
                  {user ? (
                    <Redirect to="/" /> // TODO change to dashboard
                  ) : (
                    <SignUp
                      onRegister={handleRegister}
                      onSetUserInput={handleSetUserInput}
                    />
                  )}
                </Route>
                <Route path="/reset/request">
                  <PasswordRequest
                    onRequestPassword={handlePasswordRequest}
                    onSetUserInput={handleSetUserInput}
                  />
                </Route>
                <Route exact path="/reset/password/:userId/:token">
                  <PasswordReset
                    onResetPassword={handlePasswordReset}
                    onSetUserInput={handleSetUserInput}
                  />
                </Route>
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute path="/quiztest" component={QuizTest} />

                {/* <Route path="/dashboard">
                  <Dashboard />
                </Route> */}
                <Redirect to="/" exact />
              </Switch>
            </Box>
          </Box>
        </UserContext.Provider>
        <Footer />
      </Container>
    </>
  );
};

export default App;
