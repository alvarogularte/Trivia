import { combineReducers } from 'redux';
import login from './login';
import main from './main';

const reducer = combineReducers({ login, main });

export default reducer;
