import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const Question = ({ question_text, answers }) => {
    const classes = useStyles();

    return (
        <div>
            {question_text}
            {answers.map((answer) => {
                return <p key={answer._id} className={classes.answer}>{answer.text}</p>
            })}
        </div>
    )
}

export default Question;


const useStyles = makeStyles((theme) => ({
    answer: {
        border: "1px solid white",
    },
}))