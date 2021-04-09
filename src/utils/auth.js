import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const { REACT_APP_SERVER_URL, REACT_APP_NAME } = process.env;

const register = async (credentials) => {
  try {
    const data = await axios.post(
      `${REACT_APP_SERVER_URL}/signup`,
      {
        ...credentials,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    const token = data.data.token; // TODO fix this shit
    if (token) {
      Cookies.set(`${REACT_APP_NAME}-auth-token`, token);
      return data.data;
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

const login = async (credentials) => {
  try {
    const data = await axios.post(`${REACT_APP_SERVER_URL}/login`, {
      ...credentials,
    });

    const token = data.data.token; // TODO fix this shit
    if (token) {
      Cookies.set(`${REACT_APP_NAME}-auth-token`, token);
      return data.data;
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

const logout = () => {
  console.log("user loggin outs");
  Cookies.remove(`${REACT_APP_NAME}-auth-token`, { path: "/" });
};

const getUser = async (userId) => {
  try {
    const user = await axios.get(
      `${REACT_APP_SERVER_URL}/api/v1/user/${userId}`
    );
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

const decodeToken = () => {
  const token = Cookies.get(`${REACT_APP_NAME}-auth-token`);
  let decodedToken;
  try {
    if (token) {
      decodedToken = jwt.decode(token);
    }
  } catch (e) {
    console.log(e.message);
  }
  return decodedToken;
};

export { login, logout, getUser, decodeToken, register };
