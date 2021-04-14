import axios from "axios";
import moment from "moment";

const { REACT_APP_SERVER_URL } = process.env;

//--------------------------------------------
// CREATE TRAINING
//--------------------------------------------
const createTraining = async (userId, sub_category_id, simulation) => {

  try {
    let time_start,
      time_end = "";
    if (simulation) {
      time_start = Date.now();
      time_end = moment(time_start).add(20, "m").toDate();
    }

    // TODO if (sub_category_id && simulation===false) {
    const trainingQuestions = await axios.get(
      `${REACT_APP_SERVER_URL}/question/set/${sub_category_id}/3`
    );


    const data = await axios.post(
      `${REACT_APP_SERVER_URL}/training`,
      {
        userId,
        questions: trainingQuestions.data,
        simulation,
        time_start,
        time_end,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return data.data._id;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

//--------------------------------------------
// UPDATE TRAINING
//--------------------------------------------
const updateTraining = async (training) => {

  await training.questions.forEach((question) => {
    let rightAnswer = true;
    question.answers.forEach((answer) => {
      if (!answer.checked === answer.userAnswer) {
        return rightAnswer = false};
    })
    question['answeresRight'] = rightAnswer
  })

  try {
    await axios.put(
      `${REACT_APP_SERVER_URL}/training/${training._id}`, 
      { ...training });

      return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }

}


export { createTraining, updateTraining };

// questions: Array(5)
// 0:
// answers: Array(1)
// 0:
// checked: true
// text: "Das Personenbeförderungsrecht regelt den öffentlichen und privaten Personennahverkehr  mit Straßenbahnen, Kraftomnibussen und Obussen, Mietomnibussen, mit Taxen und Mietwagen sowie Ausflugsfahrten und FeiernzielReisen mit Kraftomnibussen oder Pkw."
// userAnswer: true
// _id: "a3bced9e-fea6-4ccc-a831-461f4613247e"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// original_id: "6075f0310c7961044fff3230"
// question_text: "Was Regelt des Personenbeförderungsgesetz? "
// sub_category: "60745889c74494e103018c8c"
// _id: "05a24174-9cbb-4684-aa95-72b5e26208a9"
// __proto__: Object
// 1: {_id: "65bf873c-0d4d-4e62-9c2f-d689377258db", original_id: "6075f0310c7961044fff3231", question_text: "Welche Beförderung von Personen unterliegen dem Personenbeförderungsgesetz (PBefG)?", sub_category: "60745889c74494e103018c8c", answers: Array(1)}
// 2: {_id: "16a109fd-c567-429a-b860-057194a906d5", original_id: "6075f0310c7961044fff3232", question_text: "Welche Beförderungen von Personen unterliegen nicht dem Personenbeförderungsgesetz?", sub_category: "60745889c74494e103018c8c", answers: Array(2)}
// 3: {_id: "dd164ae9-e05c-47ec-bb25-f19c5169de29", original_id: "6075f0310c7961044fff3233", question_text: "Wer unterliegt dem PBefG?   ", sub_category: "60745889c74494e103018c8c", answers: Array(3)}
// 4: {_id: "8b2b1ed4-3066-46f9-82f8-bde89ee3c88f", original_id: "6075f0310c7961044fff3235", question_text: "Wer ist Unternehmer im Sinne des PBefG?", sub_category: "60745889c74494e103018c8c", answers: Array(1)}
// length: 5
// __proto__: Array(0)
// simulation: true
// time_end: "2021-04-13T20:54:19.495Z"
// time_start: "2021-04-13T20:34:19.495Z"
// userId: "606db3200d2141d1da8c0728"
// __v: 0
// _id: "6076004b63302f71c510dac9"
// __proto__: Object