import axios from 'axios';
import moment from 'moment';
import serverUrl from './serverUrl';

//--------------------------------------------
// CREATE TRAINING
//--------------------------------------------
const createTraining = async (userId, sub_category_id) => {
  try {
    const time_start = Date.now();
    const time_end = moment(time_start).add(20, 'm').toDate();

    let questions = await axios.get(
      `${serverUrl}/question/set/${sub_category_id}/3`
    );

    const data = await axios.post(
      `${serverUrl}/training`,
      {
        userId,
        time_start,
        time_end,
        questions: questions.data,
        simulation: false,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data.data._id;
  } catch (e) {
    return false;
  }
};

//--------------------------------------------
// CREATE SIMULATION
//--------------------------------------------
const createSimulation = async (userId) => {
  try {
    const time_start = Date.now();
    const time_end = moment(time_start).add(20, 'm').toDate();

    let questions = [];

    const result = await axios.get(`${serverUrl}/subcategory`);
    const subCategories = result.data;

    await subCategories.forEach((sub) => {
      let shuffled = sub.questions.sort(() => 0.5 - Math.random()).slice(0, 1);
      questions.push(...shuffled);
    });

    const data = await axios.post(
      `${serverUrl}/training`,
      {
        userId,
        questions,
        time_start,
        time_end,
        simulation: true,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data.data._id;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

//--------------------------------------------
// UPDATE TRAINING OR SIMULATION
//--------------------------------------------
const updateTrainingOrSimulation = async (training) => {
  await training.questions.forEach((question) => {
    let rightAnswer = true;
    question.answers.forEach((answer) => {
      if (!answer.checked === answer.userAnswer) {
        return (rightAnswer = false);
      }
    });
    question['answeresRight'] = rightAnswer;
  });

  try {
    await axios.put(`${serverUrl}/training/${training._id}`, {
      ...training,
    });
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

//--------------------------------------------
// UPDATE TEST TRAINING
//--------------------------------------------
const testTrainingResults = async (training) => {
  training.time_end = Date.now();

  let rightones = 0;
  await training.questions.forEach((question) => {
    let rightAnswer = true;
    question.answers.forEach((answer) => {
      if (!answer.checked === answer.userAnswer) {
        return (rightAnswer = false);
      }
    });
    question['answeresRight'] = rightAnswer;
    if (rightAnswer) rightones += 1;
  });

  training.passed = rightones >= training.questions.length / 2;

  try {
    return training;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

export {
  createTraining,
  createSimulation,
  updateTrainingOrSimulation,
  testTrainingResults,
};
