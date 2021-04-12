import axios from "axios";
import moment from "moment";

const { REACT_APP_SERVER_URL } = process.env;

//--------------------------------------------
// CREATE TRAINING
//--------------------------------------------
const createTraining = async (userId, sub_category_id, simulation) => {

  console.log(sub_category_id)

  try {
    let time_start, time_end = "";
    let question_set;
    if (simulation) {
      time_start = Date.now();
      time_end = moment(time_start).add(20, "m").toDate();
    }

    if (sub_category_id && simulation===false) {
      const trainingQuestions = await axios.get(
        `${REACT_APP_SERVER_URL}/question/set/${sub_category_id}/18`
      ); 
      
    }


    // const data = await axios.post(
    //   `${REACT_APP_SERVER_URL}/training`,
    //   {
    //     userId,
    //     question_set,
    //     simulation,
    //     time_start,
    //     time_end,
    //   },
    //   { headers: { "Content-Type": "application/json" } }
    // );
    // return data.data
  } catch (e) {
    console.log(e.message);
    return false;
  }
};


export { createTraining };