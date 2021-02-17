import { combineReducers } from 'redux';
import { userLoginReducer, userAddReducer } from './userReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userAdd: userAddReducer,
});
