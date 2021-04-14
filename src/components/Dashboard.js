import { useState, useRef, useContext } from 'react';
import UserContext from '../context/UserContext';
import api from '../services/api';
import validator from 'validator';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { SettingsOutlined, Person, Lock } from '@material-ui/icons';
import theme from '../theme';

const useStyles = makeStyles((theme) => ({
  dashboardBox: {
    margin: '2rem auto',
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    border: '2px solid #fff',
    color: '#fff',
    borderRadius: 10,
    padding: '0.5rem',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      padding: '1.5rem',
    },
  },
  dashboardTitle: {
    fontWeight: '300',
    fontStyle: 'italic',
    padding: '2rem 0',
  },
  userBox: {
    paddingBottom: '2rem',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
    },
  },
  userAvatar: (props) => ({
    width: '10rem',
    height: '10rem',
    fontSize: '4rem',
    backgroundColor: props.avatarFallbackBg,
  }),
  userProfileBox: {
    padding: '2rem 0',
  },
  userProfileBoxTitle: {
    padding: '2rem 0',
  },
  userIcon: {
    width: '100%',
    textAlign: 'center',
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
  },
  updateForm: {
    padding: '2rem 0',
    width: '100%',
    '& input': {
      color: '#fff',
    },
  },
}));

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
  const [userUpdatePass, setUserUpdatePass] = useState();
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
    setUserUpdateProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitNewProfile = (e) => {
    e.preventDefault();
    resetAlertMessages();
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
        errorProfileMsg: [{ msg: 'Please fill all fields', param: 'required' }],
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
      console.log(err.response);
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
    setUserUpdatePass((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitNewPass = (e) => {
    e.preventDefault();
    resetAlertMessages();
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
        errorPassMsg: [{ msg: 'Please fill all fields', param: 'required' }],
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
      gearIcon.current.style.color = theme.palette.primary.main;
    } else {
      resetAlertMessages();
      gearIcon.current.style.color = '#fff';
    }
  };

  const resetAlertMessages = () => {
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
          variant="h2"
          align="center"
          className={classes.dashboardTitle}
        >
          Dashboard
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome{' '}
          {`${
            user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
          }`}
        </Typography>
        {user && (
          <Grid container className={classes.userBox}>
            <Grid container item xs={12} md={6} justify="center">
              <Avatar alt="user avatar" src="" className={classes.userAvatar}>
                {user.first_name.split('')[0].toUpperCase()}
              </Avatar>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={6}
              className={classes.userProfileBox}
            >
              <Grid container alignItems="center" justify="space-between">
                <Typography
                  variant="h3"
                  className={classes.userProfileBoxTitle}
                >
                  Profile
                </Typography>
                <SettingsOutlined
                  fontSize="large"
                  onClick={handleClickUpdateUser}
                  ref={gearIcon}
                  className={classes.settingsIcon}
                />
              </Grid>
              {user && !isUpdating && (
                <>
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
                </>
              )}
              {isUpdating && (
                <>
                  <Box
                    width="100%"
                    component="form"
                    className={classes.updateForm}
                    onSubmit={handleSubmitNewProfile}
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
                        name="email"
                        value={userUpdateProfile.email}
                        onChange={handleChangeProfileInput}
                      ></TextField>
                    </Grid>
                    <Button color="primary" variant="contained" type="submit">
                      Update Profile
                    </Button>
                  </Box>
                  <Box
                    component="form"
                    onSubmit={handleSubmitNewPass}
                    className={classes.updateForm}
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
                      <Typography variant="subtitle1">Old Password</Typography>
                      <TextField
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
                      <Typography variant="subtitle1">New Password</Typography>
                      <TextField
                        type="password"
                        name="password"
                        onChange={handleChangePassInput}
                      />
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                      Update Password
                    </Button>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        )}
        <Divider className={classes.divider} />
      </Box>
    </>
  );
}
