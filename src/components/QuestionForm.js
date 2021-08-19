import { Button, IconButton, List, ListItem } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import React, { Fragment } from 'react';
import AnswerInput from './AnswerInput';
import { onSuccess } from '../utils';
import useQuestionState from '../hooks/useQuestionState';

const QuestionForm = ({ questionState, handleSubmit, handleRemoveQuestion }) => {
  const [
    state,
    addAnswer,
    removeAnswer,
    markAsCorrect,
    handleChange,
    handleAnswerChange,
  ] = useQuestionState(questionState);

  const saveQuestion = e => {
    e.preventDefault();
    handleSubmit(state);
    onSuccess('La pregunta ha sido guardada exitosamente');
  }

  const removeQuestion = () => {
    handleRemoveQuestion(state);
  } 

  return (
    <Fragment>
      <form className="Form--Upload flex flex--column items--start QuestionForm" onSubmit={saveQuestion}>
        <IconButton className="f-self-align--end" onClick={removeQuestion}>
          <Close />
        </IconButton>
        <p className="Textfield width--full">
          <label className="Textfield__Label" htmlFor="question">Pregunta</label>
          <input className="Textfield__Input Input--Full" type="text" name="question" id="question" value={state.question} required onChange={handleChange} placeholder="¿Cuál es el nombre del profesor?" />
        </p>
        {
          state.correctAnswer && 
          <div>
            <h5>Respuesta correcta</h5>
            <List>
              <ListItem>
              { state.correctAnswer.answer }
              </ListItem>
            </List>
          </div>
        }
        <Button
          variant="contained"
          color="secondary"
          startIcon={ <Add /> }
          onClick={addAnswer}
        >
          Agregar respuesta
        </Button>
        <br />
        <br />
        {
          state.answers.map((a, idx) => <AnswerInput key={`answer-${idx}`} answerState={a} deleteAnswer={removeAnswer} markAsCorrect={markAsCorrect} handleChange={handleAnswerChange} />)
        }
        <button 
          type="submit" 
          className="Button Button--Icon Button--Success width--full" 
          disabled={!state.question || !state.correctAnswer}
        >
          Guardar cambios
        </button>
      </form>
    </Fragment>
  );
}

export default QuestionForm;