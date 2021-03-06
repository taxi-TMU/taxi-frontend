import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import taxiAppBg from './images/taxi-bg.png';
import HeroText from './components/HeroText';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Login from './components/LogIn';
import PasswordRequest from './components/PasswordRequest';
import PasswordReset from './components/PasswordReset';
import SelectCategory from './components/SelectCategory';
import SignUp from './components/SignUp';
import Training from './components/Training';
import StartSimulation from './components/StartSimulation';
import Result from './components/Result';
import About from './components/About';
import {
  login,
  getUser,
  decodeToken,
  register,
  logout,
  requestPasswordReset,
  resetPassword,
} from './utils/auth';
import UserContext from './context/UserContext';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [user, setUser] = useState();
  const [userInput, seUserInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    errorMsg: null,
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    successMsg: null,
  });

  const { pathname } = useLocation();
  const props = {
    background:
      pathname === '/'
        ? `linear-gradient(rgba(35, 47, 55, 0.61), rgba(35, 47, 55, 0.61)), url(${taxiAppBg}) no-repeat center / cover`
        : '#232f37',
  };
  const classes = useStyle(props);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    resetAlerts();
  }, [pathname]);

  const handleSetUserInput = (e) => {
    resetAlerts();
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
    await resetPassword(userInput, userId, token);
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    resetAlerts();
    const isAuthenticated = await login(userInput);
    if (isAuthenticated.login) {
      setIsSuccess({ success: true, successMsg: 'Logged in successfully' });
      checkIfLoggedIn();
      seUserInput(null);
      setIsLoading(false);
    } else {
      setIsError({ error: true, errorMsg: [isAuthenticated.error] });
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    resetAlerts();
    const isAuthenticated = await register(userInput);
    if (isAuthenticated.login) {
      setIsSuccess({ success: true, successMsg: 'Registration successfully' });
      checkIfLoggedIn();
      seUserInput(null);
      setIsLoading(false);
    } else {
      setIsError({
        error: true,
        errorMsg: isAuthenticated.error,
      });
      setIsLoading(false);
    }
  };

  const checkIfLoggedIn = async () => {
    const response = await decodeToken();
    let me;
    if (!response) return logout();
    if (response) me = await getUser(response._id);
    setUser(me);
  };

  const resetAlerts = () => {
    setIsError({ error: false, errorMsg: null });
    setIsSuccess({ success: false, successMsg: null });
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
                    <Redirect to="/dashboard" />
                  ) : (
                    <Login
                      onLogin={handleLogin}
                      onSetUserInput={handleSetUserInput}
                      isError={isError}
                      isSuccess={isSuccess}
                      isLoading={isLoading}
                    />
                  )}
                </Route>
                <Route path="/signup">
                  {user ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <SignUp
                      onRegister={handleRegister}
                      onSetUserInput={handleSetUserInput}
                      isError={isError}
                      isSuccess={isSuccess}
                      isLoading={isLoading}
                    />
                  )}
                </Route>

                <Route exact path="/training/:id" component={Training} />

                <Route exact path="/result/:id" component={Result} />

                <Route path="/reset/request">
                  <PasswordRequest
                    onRequestPassword={handlePasswordRequest}
                    onSetUserInput={handleSetUserInput}
                  />
                </Route>
                <Route path="/about" component={About} />

                <Route exact path="/reset/password/:userId/:token">
                  <PasswordReset
                    onResetPassword={handlePasswordReset}
                    onSetUserInput={handleSetUserInput}
                  />
                </Route>

                <Route exact path="/training">
                  <Training testrunmode={true} />
                </Route>
                <Route exact path="/result">
                  <Result testrunmode={true} />
                </Route>

                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute
                  exact
                  path="/categories"
                  component={SelectCategory}
                />

                <ProtectedRoute
                  exact
                  path="/simulation"
                  component={StartSimulation}
                />
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

const useStyle = makeStyles((theme) => ({
  headerBg: (props) => ({
    background: props.background,
    border: '3px solid #a3ccc3',
  }),
  mainSpace: {
    padding: '0 1rem 3rem 1rem',
  },
}));
