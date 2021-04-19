import { useState, useRef, useContext } from 'react';
import UserContext from '../context/UserContext';
import api from '../services/api';
import validator from 'validator';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { SettingsOutlined, Person, Lock } from '@material-ui/icons';
import theme from '../theme';
import Statistics from './Statistics';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
  Button,
  TextField,
  IconButton,
} from '@material-ui/core';

//--------------------------------------------
// dynamic bg when avatar image fallback
//--------------------------------------------
const randomAvatarBg = () => {
  const arrAvatarBg = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ];
  const randomBg = Math.floor(Math.random() * arrAvatarBg.length);
  return arrAvatarBg[randomBg];
};

const props = {
  avatarFallbackBg: randomAvatarBg(),
};

//--------------------------------------------
// dashboard component
//--------------------------------------------
export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [userUpdateProfile, setUserUpdateProfile] = useState();
  const [userUpdatePass, setUserUpdatePass] = useState({
    old_password: '',
    password: '',
  });
  // const [isLoading, setIsLoading] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState({
    isProfileError: false,
    isPassError: false,
    errorProfileMsg: null,
    errorPassMsg: null,
  });
  const [isSuccess, setIsSuccess] = useState({
    isProfileSuccess: false,
    isPassSuccess: false,
    successProfileMsg: null,
    successPassMsg: null,
  });
  const gearIcon = useRef();
  const classes = useStyles(props);

  //--------------------------------------------
  // activate user update
  //--------------------------------------------
  const handleClickUpdateUser = (e) => {
    setUserUpdateProfile(user);
    setUserUpdatePass((prevState) => ({
      ...prevState,
      userId: user.id,
    }));
    userUpdateStatus(!isUpdating);
    setIsUpdating((prevState) => !prevState);
  };

  //--------------------------------------------
  // update user profile
  //--------------------------------------------
  const handleChangeProfileInput = (e) => {
    resetAlerts();
    setUserUpdateProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitNewProfile = (e) => {
    e.preventDefault();
    resetAlerts();
    // check if data is not empty
    if (
      !validator.isEmpty(userUpdateProfile.first_name) &&
      !validator.isEmpty(userUpdateProfile.last_name) &&
      !validator.isEmpty(userUpdateProfile.email)
    ) {
      updateUserProfile(userUpdateProfile);
    } else {
      setIsError((prevState) => ({
        ...prevState,
        isProfileError: true,
        errorProfileMsg: [
          { msg: "Please fill all fields", param: "required" },
        ],
      }));
    }
  };

  const updateUserProfile = async (data) => {
    try {
      const res = await api.put(`/user/${user.id}`, data);
      setIsSuccess((prevState) => ({
        ...prevState,
        isProfileSuccess: true,
        successProfileMsg: res.data.msg,
      }));
      setUser(res.data.obj);
    } catch (err) {
      if (err.response) {
        setIsError((prevState) => ({
          ...prevState,
          isProfileError: true,
          errorProfileMsg: err.response.data.errors.errors,
        }));
      } else if (err.request) {
        setIsError((prevState) => ({
          ...prevState,
          isProfileError: true,
          errorProfileMsg: err.request,
        }));
      }
    }
  };

  //--------------------------------------------
  // update new password
  //--------------------------------------------
  const handleChangePassInput = (e) => {
    resetAlerts();
    setUserUpdatePass((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitNewPass = (e) => {
    e.preventDefault();
    resetAlerts();
    // check if data is not empty
    if (
      !validator.isEmpty(userUpdatePass.old_password) &&
      !validator.isEmpty(userUpdatePass.password)
    ) {
      updatePassUser(userUpdatePass);
    } else {
      setIsError((prevState) => ({
        ...prevState,
        isPassError: true,
        errorPassMsg: [
          { msg: "Please fill all fields", param: "required" },
        ],
      }));
    }
  };

  const updatePassUser = async (data) => {
    try {
      const res = await api.put(`user/changePassword`, data);
      setIsSuccess((prevState) => ({
        ...prevState,
        isPassSuccess: true,
        successPassMsg: res.data,
      }));
    } catch (err) {
      const checkTypeOfError = err.response.data.hasOwnProperty('msg')
        ? [err.response.data]
        : err.response.data.errors.errors;
      if (err.response) {
        setIsError((prevState) => ({
          ...prevState,
          isPassError: true,
          errorPassMsg: checkTypeOfError,
        }));
      } else if (err.request) {
        setIsError((prevState) => ({
          ...prevState,
          isPassError: true,
          errorPassMsg: err.request,
        }));
      }
    }
  };

  //--------------------------------------------
  // utils functions for user update
  //--------------------------------------------
  const userUpdateStatus = (status) => {
    if (status) {
      gearIcon.current.style.backgroundColor = theme.palette.secondary.main;
    } else {
      resetAlerts();
      gearIcon.current.style.backgroundColor = theme.palette.primary.main;
    }
  };

  const resetAlerts = () => {
    setIsSuccess({
      isProfileSuccess: false,
      isPassSuccess: false,
      successProfileMsg: null,
      successPassMsg: null,
    });
    setIsError({
      isPassError: false,
      isProfileError: false,
      errorProfileMsg: null,
      errorPassMsg: null,
    });
  };

  return (
    <>
      <Box className={classes.dashboardBox}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="textPrimary"
          className={classes.dashboardTitle}
        >
          Welcome{" "}
          {`${
            user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
          }`}
        </Typography>

        {user && <Statistics />}

        <Box py={3}>
          <Divider className={classes.divider} />
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            component="h2"
            variant="h5"
            align="center"
            color="textPrimary"
            className={classes.dashboardTitle}
          >
            Settings
          </Typography>
          <IconButton
            fontSize="large"
            onClick={handleClickUpdateUser}
            ref={gearIcon}
            className={classes.settingsIcon}
          >
            <SettingsOutlined />
          </IconButton>
        </Box>
        {user && (
          <Grid container className={classes.userBox}>
            <Grid
              container
              item
              xs={12}
              md={4}
              justify="center"
              alignItems="center"
            >
              <Avatar alt="user avatar" src="" className={classes.userAvatar}>
                {user.first_name.split('')[0].toUpperCase()}
              </Avatar>
            </Grid>
            {user && !isUpdating && (
              <Grid item xs={12} md={8}>
                <Box width="100%" py={2}>
                  {isError.isProfileError &&
                    isError.errorProfileMsg.map((err, index) => (
                      <Alert key={index} variant="filled" severity="error">
                        {err.param}: {err.msg}
                      </Alert>
                    ))}
                  {isSuccess.isProfileSuccess && (
                    <Alert variant="filled" severity="success">
                      {isSuccess.successProfileMsg}
                    </Alert>
                  )}
                </Box>
                <Grid
                  container
                  item
                  justify="center"
                  direction="column"
                  className={classes.darkRow}
                >
                  <Typography variant="subtitle1">First Name</Typography>
                  <Typography variant="body1">{user.first_name}</Typography>
                </Grid>
                <Grid
                  container
                  item
                  justify="center"
                  direction="column"
                  className={classes.lightRow}
                >
                  <Typography variant="subtitle1">Last Name</Typography>
                  <Typography variant="body1">{user.last_name}</Typography>
                </Grid>
                <Grid
                  container
                  item
                  justify="center"
                  direction="column"
                  className={classes.darkRow}
                >
                  <Typography variant="subtitle1">Email</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Grid>
              </Grid>
            )}
            {isUpdating && (
              <Grid item xs={12} md={4}>
                <Box className={classes.userProfileBox}>
                  <Box
                    width="100%"
                    component="form"
                    className={classes.updateForm}
                    onSubmit={handleSubmitNewProfile}
                    borderRadius={4}
                    boxShadow={4}
                  >
                    <Person className={classes.userIcon} fontSize="large" />
                    <Box width="100%" py={2}>
                      {isError.isProfileError &&
                        isError.errorProfileMsg.map((err, index) => (
                          <Alert key={index} variant="filled" severity="error">
                            {err.param}: {err.msg}
                          </Alert>
                        ))}
                      {isSuccess.isProfileSuccess && (
                        <Alert variant="filled" severity="success">
                          {isSuccess.successProfileMsg}
                        </Alert>
                      )}
                    </Box>
                    <Grid
                      container
                      item
                      justify="center"
                      direction="column"
                      className={classes.darkRow}
                    >
                      <Typography variant="subtitle1">First Name</Typography>
                      <TextField
                        color="secondary"
                        name="first_name"
                        value={userUpdateProfile.first_name}
                        onChange={handleChangeProfileInput}
                      ></TextField>
                    </Grid>
                    <Grid
                      container
                      item
                      justify="center"
                      direction="column"
                      className={classes.lightRow}
                    >
                      <Typography variant="subtitle1">Last Name</Typography>
                      <TextField
                        name="last_name"
                        value={userUpdateProfile.last_name}
                        onChange={handleChangeProfileInput}
                        color="secondary"
                      ></TextField>
                    </Grid>
                    <Grid
                      container
                      item
                      justify="center"
                      direction="column"
                      className={classes.darkRow}
                    >
                      <Typography variant="subtitle1">Email</Typography>
                      <TextField
                        color="secondary"
                        name="email"
                        value={userUpdateProfile.email}
                        onChange={handleChangeProfileInput}
                      ></TextField>
                    </Grid>
                    <Box display="flex" justifyContent="center" py={2}>
                      <Button color="primary" variant="contained" type="submit">
                        Update profile
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}
            {isUpdating && (
              <Grid item xs={12} md={4}>
                <Box className={classes.userProfileBox}>
                  <Box
                    component="form"
                    onSubmit={handleSubmitNewPass}
                    className={classes.updateForm}
                    borderRadius={4}
                    boxShadow={4}
                  >
                    <Lock className={classes.userIcon} fontSize="large" />
                    <Box width="100%" py={2}>
                      {isError.isPassError &&
                        isError.errorPassMsg.map((err, index) => (
                          <Alert key={index} variant="filled" severity="error">
                            {err.param}: {err.msg}
                          </Alert>
                        ))}
                      {isSuccess.isPassSuccess && (
                        <Alert variant="filled" severity="success">
                          {isSuccess.successPassMsg}
                        </Alert>
                      )}
                    </Box>
                    <Grid
                      container
                      item
                      justify="center"
                      direction="column"
                      className={classes.darkRow}
                    >
                      <Typography variant="subtitle1">
                        Old Password
                      </Typography>
                      <TextField
                        color="secondary"
                        type="password"
                        name="old_password"
                        onChange={handleChangePassInput}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      justify="center"
                      direction="column"
                      className={classes.lightRow}
                    >
                      <Typography variant="subtitle1">
                        New Password
                      </Typography>
                      <TextField
                        color="secondary"
                        type="password"
                        name="password"
                        onChange={handleChangePassInput}
                      />
                    </Grid>
                    <Box display="flex" justifyContent="center" py={2}>
                      <Button type="submit" color="primary" variant="contained">
                        Update Password
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  dashboardBox: {
    padding: '2rem',
    margin: '2rem auto',
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    border: '2px solid #fff',
    color: '#fff',
    borderRadius: 10,
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
  },
  dashboardTitle: {
    fontWeight: '300',
    fontStyle: 'italic',
    // padding: "0.5rem 0",
    color: '#fff',
  },
  userAvatar: (props) => ({
    width: '10rem',
    height: '10rem',
    fontSize: '4rem',
    backgroundColor: props.avatarFallbackBg,
  }),
  userProfileBox: {
    padding: '1rem 0',
    [theme.breakpoints.up('sm')]: {
      padding: '2rem 1rem',
    },
  },
  userProfileBoxTitle: {
    padding: '2rem 0',
  },
  userIcon: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.secondary.main,
  },
  divider: {
    backgroundColor: '#fff',
  },
  darkRow: {
    backgroundColor: 'rgba(35, 47, 55, 0.6)',
    padding: '0.5rem',
  },
  lightRow: {
    backgroundColor: 'rgba(35, 47, 55, 0.2)',
    padding: '0.5rem',
  },
  settingsIcon: {
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    margin: '0 2rem',
    boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.3)',
  },
  updateForm: {
    backgroundColor: '#232F37',
    padding: '1rem',
    width: '100%',
    '& input': {
      color: '#fff',
    },
  },
}));
