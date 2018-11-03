import { SET_NOT_AUTHENTICATED, SET_AUTHENTICATED } from './constants';

export const register = (user, history) => {
  return dispatch => {
    fetch('http://localhost:3001/users',
      {
        method: 'POST',
        headers: {
          'Accept': 'Application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          organisation: user.organisation,
          phone: user.phone,
          website: user.website
        })
      })
      .then(response => response.json())
      .then((result) => {

        if (result) {
          dispatch(setNotAuthenticated()); //we do not want any item in local storage from registration. Error: when using setAuthenticated(result) and registering a user that already exists we were redirected to mainpage with localstorage token: [object object]. Changed to setNotAuthenticated() to fix this.
          history.push('/login');
          alert(result.message);
        } else {
          alert(result.message);
        }

      })
      .catch(err => {
        console.log('err', err);
      });
  };
};

export const login = (user, history) => {
  return dispatch => {
    fetch('http://localhost:3001/hmf/users/login',
      {
        method: 'POST',
        headers: {
          'Accept': 'Application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      })
      .then(response => response.json())
      .then((user) => {
        if (!user.token) {
          console.log('Authentication failed');
          alert('authentication failed');
        } else {
          dispatch(setAuthenticated(user));
          history.push('/admin');
        }
      })
      .catch(err => console.log('err', err));
  };
};

export function setAuthenticated(user) {
  window.localStorage.setItem('token', user.token);
  return {
    type: SET_AUTHENTICATED,
    payload: user
  };
}

export function setNotAuthenticated() {
  window.localStorage.removeItem('token');
  return {
    type: SET_NOT_AUTHENTICATED,
    payload: null
  };
}