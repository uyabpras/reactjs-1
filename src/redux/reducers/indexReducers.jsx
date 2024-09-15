import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducers';
import jobReducer from '../reducers/jobReducer';

const indexReducers = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
});

export default indexReducers;