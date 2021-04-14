import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const { REACT_APP_SERVER_URL, REACT_APP_NAME } = process.env;

//--------------------------------------------
// REGISTER
//--------------------------------------------
const register = async (credentials) => {
  try {
    const data = await axios.post(
      `${REACT_APP_SERVER_URL}/signup`,
      {
        ...credentials,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const token = data.headers['x-authorization-token'];
    if (token) {
      Cookies.set(`${REACT_APP_NAME}-auth-token`, token);
      return data.data;
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

//--------------------------------------------
// LOGIN
//--------------------------------------------
const login = async (credentials) => {
  try {
    const data = await axios.post(`${REACT_APP_SERVER_URL}/login`, {
      ...credentials,
    });

    const token = data.headers['x-authorization-token'];
    if (token) {
      Cookies.set(`${REACT_APP_NAME}-auth-token`, token);
      return { login: true, data: data.data };
    }
  } catch (e) {
    console.log(e.message);
    return { login: false, error: e.response.data };
  }
};

//--------------------------------------------
// LOGOUT
//--------------------------------------------
const logout = () => {
  Cookies.remove(`${REACT_APP_NAME}-auth-token`, { path: '/' });
};

//--------------------------------------------
// REQUEST PASSWORD
//--------------------------------------------
const requestPasswordReset = async (email) => {
  try {
    await axios.post(`${REACT_APP_SERVER_URL}/resetPasswordRequest`, {
      ...email,
    });
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

//--------------------------------------------
// RESET PASSWORD
//--------------------------------------------
const resetPassword = async (password, userId, token) => {
  try {
    await axios.post(`${REACT_APP_SERVER_URL}/resetPassword`, {
      password: password.password,
      userId,
      token,
    });
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

//--------------------------------------------
// GET USER
//--------------------------------------------
const getUser = async (userId) => {
  // TODO refactor to get user by if from token
  try {
    const user = await axios.get(`${REACT_APP_SERVER_URL}/user/${userId}`);
    const userInfos = {
      id: user.data._id,
      first_name: user.data.first_name,
      last_name: user.data.last_name,
      email: user.data.email,
      createdAt: user.data.createdAt,
    };
    return userInfos;
  } catch (e) {
    console.log(e.message);
  }
};

//--------------------------------------------
// DECODE TOKEN
//--------------------------------------------
const decodeToken = () => {
  const token = Cookies.get(`${REACT_APP_NAME}-auth-token`);
  let decodedToken; // undefined ===> falsy
  try {
    if (token) {
      decodedToken = jwt.decode(token); // decode !== verify
      // decodedToken ===> truthy
    }
  } catch (e) {
    console.log(e.message);
  }
  return decodedToken; // undefined
};

//--------------------------------------------
// VERIFY TOKEN FOR PROTECTED ROUTE
//--------------------------------------------
axios.defaults.baseURL = REACT_APP_SERVER_URL;
const setAuthHeaders = () => {
  const token = Cookies.get(`${REACT_APP_NAME}-auth-token`);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export {
  login,
  logout,
  getUser,
  decodeToken,
  register,
  requestPasswordReset,
  resetPassword,
  setAuthHeaders,
};
