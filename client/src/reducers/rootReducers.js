import { combineReducers } from 'redux';
import { userLoginReducer, userAddReducer } from './userReducers';
import { getCurrentProfileReducer } from './profileReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userAdd: userAddReducer,
  profile: getCurrentProfileReducer,
});
