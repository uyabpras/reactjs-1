import axios from 'axios';
import Cookies from 'js-cookie';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://job-vacancy-api.vercel.app/api/auth/login', {
      email,
      password,
    });

    if (response.status === 201 || response.status === 200) {
      const { token, user } = response.data;
      Cookies.set('authToken', token, { expires: 7 });
      Cookies.set('authName', JSON.stringify(user), { expires: 7 });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user },
      });
    } else {
      throw new Error('Login failed with status: ' + response.status);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    dispatch({
      type: 'LOGIN_ERROR',
      payload: error.response ? error.response.data : 'Login failed. Please try again.',
    });
    throw error;
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://job-vacancy-api.vercel.app/api/auth/register', {
      name,
      email,
      password,
    });

    if (response.status === 201 || response.status === 200) {
      const { token, user } = response.data;

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { token, user },
      });
    } else {
      throw new Error('Register failed with status: ' + response.status);
    }
  } catch (error) {
    console.error('Error registering:', error);
    dispatch({
      type: 'LOGIN_ERROR',
      payload: error.response ? error.response.data : 'Registration failed. Please try again.',
    });
    throw error;
  }
};

export const changePassword = (id, token, newPasswordData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://job-vacancy-api.vercel.app/api/auth/${id}`,
      newPasswordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log('Password changed successfully:', response.data);
      
      dispatch({
        type: 'CHANGE_PASSWORD_SUCCESS',
        payload: response.data,
      });
    } else {
      throw new Error('Change password failed with status: ' + response.status);
    }
  } catch (error) {
    console.error('Error changing password:', error);
    dispatch({
      type: 'CHANGE_PASSWORD_ERROR',
      payload: error.response ? error.response.data : 'Change password failed. Please try again.',
    });
    throw error;
  }
};

export const logout = () => {
  Cookies.remove('authToken');
  Cookies.remove('authName');
  return {
    type: 'LOGOUT',
  };
};
