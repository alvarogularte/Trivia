import { ADD_QUESTIONS, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  questions: [],
  score: 0,
};

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return {
      ...state,
      questions: action.result,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default main;
