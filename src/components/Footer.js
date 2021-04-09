import {
  Box,
  Grid,
  MenuItem,
  Link,
  MenuList,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#232F37',
    color: '#ffffff',
    padding: '2rem 0',
    '& a': {
      color: '#ffffff',
    },
  },
  footerCopyright: {
    textAlign: 'center',
    '&::before': {
      content: '" "',
      width: '90%',
      height: '1px',
      margin: '2rem auto 1rem auto',
      backgroundColor: '#ffffff',
      display: 'block',
    },
  },
  [theme.breakpoints.up('sm')]: {
    menuListBox: {
      width: '30%',
    },
    footerCopyright: {
      '&::before': {
        width: '80%',
      },
    },
  },
  [theme.breakpoints.up('md')]: {
    footerCopyright: {
      textAlign: 'right',
      '&::before': {
        width: '100%',
      },
    },
  },
}));

export default function Footer() {
  const classes = useStyle();

  return (
    <Grid
      container
      component="footer"
      className={classes.root}
      justify="center"
    >
      <Grid item xs={12} md={10} lg={8}>
        <Box
          display="flex"
          py={3}
          width="50%"
          justifyContent="space-between"
          className={classes.menuListBox}
        >
          <MenuList>
            <MenuItem>
              <Link>Quiz</Link>
            </MenuItem>
            <MenuItem>
              <Link>Test</Link>
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem>
              <Link>Company</Link>
            </MenuItem>
            <MenuItem>
              <Link>Privacy</Link>
            </MenuItem>
          </MenuList>
        </Box>
        <Box className={classes.footerCopyright}>
          <Typography component="span" gutterBottom>
            Copyright &copy; Taxi App {new Date().getFullYear()}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
