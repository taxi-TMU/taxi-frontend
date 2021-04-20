import {
  Box,
  Grid,
  MenuItem,
  Link,
  MenuList,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";


const Footer = () => {
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
              <Link to="/simulation" component={RouterLink}>
                Simulation
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/categories" component={RouterLink}>
                Training
              </Link>
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem>
              <Link
                to="/about"
                component={RouterLink}
                className={classes.title}
              >
                About us
              </Link>
            </MenuItem>
            <MenuItem>
              <Link>Privacy</Link>
            </MenuItem>
          </MenuList>
        </Box>
        <Box className={classes.footerCopyright}>
          <Typography component="span" gutterBottom>
            Copyright &copy; TMU {new Date().getFullYear()}
          </Typography>
        </Box>
        <br />
      </Grid>
    </Grid>
  );
}

export default Footer;

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#232F37",
    color: "#ffffff",
    padding: "0 0",
    "& a": {
      color: "#ffffff",
    },
  },
  footerCopyright: {
    textAlign: "center",
    "&::before": {
      content: '" "',
      width: "90%",
      height: "1px",
      margin: "0,5rem auto 1rem auto",
      backgroundColor: "#ffffff",
      display: "block",
    },
  },
  [theme.breakpoints.up("sm")]: {
    menuListBox: {
      width: "30%",
    },
    footerCopyright: {
      "&::before": {
        width: "80%",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    footerCopyright: {
      textAlign: "center",
      "&::before": {
        width: "100%",
      },
    },
  },
}));