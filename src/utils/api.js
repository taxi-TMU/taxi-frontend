import axios from "axios";
import serverUrl from './serverUrl'

const getRequest = async (path) => {
    try {
        const data = await axios.get(
          `${serverUrl}/${path}`
        );
        return data.data;
      } catch (e) {
        console.log(e.message);
      }
};

export { getRequest };
