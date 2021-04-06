import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import taxiAppBg from './images/taxi-bg.png';
import HeroText from './components/HeroText';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Login from './components/LogIn';
import PasswordRequest from './components/PasswordRequest';
import PasswordReset from './components/PasswordReset';
import SignUp from './components/SignUp';

const useStyle = makeStyles((theme) => ({
  headerBg: {
    background: `linear-gradient(rgba(35, 47, 55, 0.61), rgba(35, 47, 55, 0.61)),  url(${taxiAppBg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: '3px solid #a3ccc3',
  },
  mainSpace: {
    padding: '6rem 1rem 10rem 1rem',
  },
  [theme.breakpoints.up('sm')]: {
    mainSpace: {
      padding: '6rem 2rem 10rem 2rem',
    },
  },
  [theme.breakpoints.up('lg')]: {
    mainSpace: {
      padding: '12rem 2rem 16rem 2rem',
    },
  },
}));

const App = () => {
  const classes = useStyle();

  return (
    <>
      <Container disableGutters maxWidth="xl">
        <Box className={classes.headerBg}>
          <Box component="header">
            <Nav />
          </Box>
          <Box component="main" className={classes.mainSpace}>
            <HeroText />
            <Login />
            <PasswordRequest />
            <PasswordReset />
            <SignUp />
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default App;
