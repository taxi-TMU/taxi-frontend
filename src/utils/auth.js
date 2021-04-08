import axios from "axios";

const loginUser = async (credentials) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      {
        ...credentials,
      }
    );
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
};
export { loginUser };

// const handleAuthentication = async (e) => {
//   e.preventDefault();
//   try {
//     const result = await axios.post(
//       `${process.env.REACT_APP_SERVER_URL}/login`,
//       {
//         email: credentials.email,
//         password: credentials.password,
//       }
//     );
//     console.log(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
