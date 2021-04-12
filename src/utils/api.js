import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const getRequest = async (path) => {
  console.log(REACT_APP_SERVER_URL)
    try {
        const data = await axios.get(
          `${REACT_APP_SERVER_URL}/${path}`
        );
        return data.data;
      } catch (e) {
        console.log(e.message);
      }
};

export { getRequest };
