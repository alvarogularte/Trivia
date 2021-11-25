import { ADD_QUESTIONS } from '../actions';

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
  default:
    return state;
  }
};

export default main;
