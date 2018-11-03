import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { SET_NOT_AUTHENTICATED, SET_AUTHENTICATED } from '../Auth/constants';

const initialState = {
  user: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
  case SET_AUTHENTICATED :
    return {
      ...state,
      user: action.payload
    };
  case SET_NOT_AUTHENTICATED :
    return {
      ...state,
      user: action.payload
    };
  default:
    return state;
  }
}

const reducers = combineReducers({
  rootReducer,
  form: formReducer
});

export default reducers;