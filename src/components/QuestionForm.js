import { Button, IconButton, List, ListItem } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import React, { Fragment, useCallback, useReducer } from 'react';
import QuestionReducer, { ADD_ANSWER, ANSWER_CONTENT, MARK_AS_CORRECT, REMOVE_ANSWER } from '../reducers/QuestionReducer';
import AnswerInput from './AnswerInput';
import { QUESTION_CONTENT } from '../reducers/QuestionReducer';
import { onSuccess } from '../utils';

const QuestionForm = ({ questionState, handleSubmit }) => {
  const [state, dispatch] = useReducer(QuestionReducer, questionState);

  const newAnswer = useCallback(() => {
    dispatch({ type: ADD_ANSWER, payload: {id: Date.now(), answer: '' }});
  }, []);

  const deleteAnswer = useCallback((answer) => {
    dispatch({ type: REMOVE_ANSWER, payload: answer });
  }, []);

  const markAsCorrect = useCallback((answer) => {
    dispatch({ type: MARK_AS_CORRECT, payload: answer });
  }, []);

  const handleChange = useCallback((e) => {
    dispatch({ type: QUESTION_CONTENT, payload: e.target.value.trimLeft() });
  }, []);

  const handleAnswerChange = useCallback(answer => {
    dispatch({type: ANSWER_CONTENT, payload: answer});
  }, []);

  const saveQuestion = e => {
    e.preventDefault();
    handleSubmit(state);
    onSuccess('La pregunta ha sido guardada exitosamente');
  }

  return (
    <Fragment>
      <form className="Form--Upload flex flex--column items--start QuestionForm" onSubmit={saveQuestion}>
        <IconButton className="f-self-align--end">
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
          onClick={newAnswer}
        >
          Agregar respuesta
        </Button>
        <br />
        <br />
        {
          state.answers.map((a, idx) => <AnswerInput key={`answer-${idx}`} answerState={a} deleteAnswer={deleteAnswer} markAsCorrect={markAsCorrect} handleChange={handleAnswerChange} />)
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