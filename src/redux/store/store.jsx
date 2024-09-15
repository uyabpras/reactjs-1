import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import indexReducers from '../reducers/indexReducers';
import Cookies from 'js-cookie';
import { thunk } from 'redux-thunk';


const token = Cookies.get('authToken');
const userCookie = Cookies.get('authName');

let user = null;
try {
  user = userCookie ? JSON.parse(userCookie) : null;
} catch (error) {
  console.error('Error parsing user cookie:', error);
}

const initialState = {
  auth: {
    token: token || null,
    user: user || null,
    isAuthenticated: !!user,
    error: null,
  },
  jobs: {
    job: null,
    jobs: [],
  },
};

const middleware = [thunk];

const store = createStore(
  indexReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
