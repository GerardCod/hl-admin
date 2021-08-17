import { IconButton } from '@material-ui/core';
import { Check, Delete } from '@material-ui/icons';
import React, { Fragment } from 'react';

const AnswerInput = ({ answerState, deleteAnswer, markAsCorrect, handleChange }) => {
  const handleInputChange = e => {
    handleChange({id: answerState.id, answer: e.target.value.trimLeft() });
  }

  return (
    <Fragment>
      <p className="Textfield flex flex--wrap width--full">
        <input className="Textfield__Input AnswerInput" type="text" name="answer" id="answer" onChange={handleInputChange} value={answerState.answer} placeholder="Katia" />
        <IconButton onClick={() => { deleteAnswer(answerState); }}>
          <Delete />
        </IconButton>
        <IconButton onClick={() => { markAsCorrect(answerState); }}>
          <Check />
        </IconButton>
      </p>
    </Fragment>
  );
}

export default AnswerInput;