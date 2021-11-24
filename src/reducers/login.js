import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
  username: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      email: action.state.email,
      username: action.state.username,
    };
  default:
    return state;
  }
};

export default login;
