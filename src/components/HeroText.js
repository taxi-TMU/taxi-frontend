import { Button, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  heroButton: {
    width: '10rem',
    height: '2.5rem',
    padding: 0
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
        width: '40%',
      },
  }
}))

export default function HeroText() {
  const classes = useStyle();

  return (
    <Box className={classes.heroBox}>
      <Typography component="h2" gutterBottom variant="h2" color="textSecondary" fontWeight={700}>
        The Hero Title
      </Typography>
      <Typography component="p" color="textSecondary">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </Typography>
      <Box className={classes.heroButtonBox} display="flex" alignItems="center" justifyContent="space-between" mt={5}>
        <Button className={classes.heroButton} color="primary" variant='contained'>log in</Button>
        <Button className={classes.heroButton} variant='outlined'>Create a profile</Button>
      </Box>
    </Box>
  );
}