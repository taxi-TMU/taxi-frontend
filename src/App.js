import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import taxiAppBg from './images/taxi-bg.png';
import HeroText from './components/HeroText';

const useStyle = makeStyles(theme => ({
  headerBg: {
    background: `linear-gradient(rgba(35, 47, 55, 0.61), rgba(35, 47, 55, 0.61)),  url(${taxiAppBg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: '3px solid #a3ccc3',
  },
  [theme.breakpoints.up('md')]: {
    mainSpace: {
      paddingLeft: '10rem'
    }
  }
}))

export default function App() {
  const classes = useStyle();

  return (
    <Container disableGutters maxWidth="xl" className={classes.headerBg}>
      <Box px={2}>
        <Box component='header'>
          navbar
        </Box>
        <Box component='main' py={8} className={classes.mainSpace}>
          <HeroText />
        </Box>
      </Box>
    </Container>
  );
}
