import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  heroBox: {
    padding: '6rem 0',
    '& a:hover': {
      textDecoration: 'none',
    },
  },
  heroButton: {
    width: '9rem',
    height: '3.5rem',
    padding: 0,
  },
  [theme.breakpoints.up('sm')]: {
    heroButtonBox: {
      justifyContent: 'start',
    },
    heroButton: {
      width: '13rem',
      marginRight: '2rem',
    },
  },
  [theme.breakpoints.up('md')]: {
    heroBox: {
      width: '60%',
      paddingLeft: '4rem',
    },
  },
  [theme.breakpoints.up('lg')]: {
    heroBox: {
      width: '40%',
      paddingLeft: '6rem',
    },
  },
}));

export default function HeroText() {
  const classes = useStyle();

  return (
    <Box className={classes.heroBox}>
      <Typography
        component="h2"
        gutterBottom
        variant="h2"
        color="textSecondary"
        fontWeight={700}
      >
        Taxi App
      </Typography>
      <Typography component="p" color="textSecondary">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Typography>
      <Box
        className={classes.heroButtonBox}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={5}
      >
        <Link component={RouterLink} to="/training">
          <Button
            className={classes.heroButton}
            color="primary"
            variant="contained"
          >
            Jetzt testen
          </Button>
        </Link>
        <Link component={RouterLink} to="/signup">
          <Button className={classes.heroButton} variant="outlined">
            Registrieren
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
