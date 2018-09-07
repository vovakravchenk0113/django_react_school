import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';
// import { history } from '../helpers/history';

export const userActions = {
  login,
  logout,
  register
};

function login(username, password) {
  return dispatch => {
    dispatch(request());

    userService.login(username, password)
      .then(
        user => {
          console.log('===here444===')
          console.log(user)

          dispatch(success(user));
          alert('successfully login.')
          if(userConstants.LOGIN_SUCCESS === 'USERS_LOGIN_SUCCESS'){  
            window.location.replace("/");
          }
        },
        error => {
          dispatch(failure(error));
          alert('error');
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(username, email, password) {
  return dispatch => {
    dispatch(request());
    userService.register(username, email, password)
      .then(
        user => {
          dispatch(success(user));
          alert('successfully register.');
        },
        error => {
          dispatch(failure(error));
          alert('error');
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: userConstants.REGISTER_REQUEST } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
