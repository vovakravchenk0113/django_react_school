import React, { Component } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { userActions } from '../actions/user.actions';
import LogoComponent from "../components/Logo";
import { connect } from "react-redux";
// import {userConstants} from '../constants/user.constants';
class LoginView extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      activeTab: 'login',

      loginEmail: '',
      loginPassword: '',
      loginSubmitted: false,

      registerusername: '',
      registerEmail: '',
      registerPassword: '',
      registerSubmitted: false,
    };

    // get isLogin() {
    //   return this.props.authState === STATE_LOGIN;
    // }
  
    // get isSignup() {
    //   return this.props.authState === STATE_SIGNUP;
    // }
  
    // changeAuthState = authState => event => {
    //   event.preventDefault();
  
    //   this.props.onChangeAuthState(authState);
    // };

    this.toggle = this.toggle.bind(this);

    this.formChange = this.formChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  formChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  loginSubmit(e) {
    e.preventDefault();
    // this.props.authState === STATE_LOGIN;
    this.setState({ loginSubmitted: true });
    const { loginEmail, loginPassword } = this.state;
    const { dispatch } = this.props;
    if (loginEmail && loginPassword) {
      dispatch(userActions.login(loginEmail, loginPassword));
      // if(userConstants.LOGIN_SUCCESS === 'USERS_LOGIN_SUCCESS'){  
      //   window.location.replace("/");
      // }
    }
  }

  registerSubmit(e) {
    e.preventDefault();
    // this.props.authState === STATE_SIGNUP;
    this.setState({ registerSubmitted: true });
    const { registerusername, registerEmail, registerPassword } = this.state;
    const { dispatch } = this.props;
    if (registerEmail && registerPassword) {
      dispatch(userActions.register( registerusername, registerEmail, registerPassword));
    }
  }

  render() {
    // const { loggingIn } = this.props;
    const { loginEmail, loginPassword, loginSubmitted, registerEmail, registerPassword,  registerusername } = this.state;
    return (
      <div className="container-fluid no-gutters page-login">

        <div className="row">
          <div className="login-wrapper" style={{width:560}} >
            <LogoComponent/>

            <div className="pt-4">

              <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <li className="nav-item text-center border-0 mb-0 w-50">
                  <a className={classNames('nav-link', 'border-0', { active: this.state.activeTab === 'login' })} onClick={() => { this.toggle('login'); }}>
                    <i className="fa fa-pencil-square" aria-hidden="true"/> Login
                  </a>
                </li>
                <li className="nav-item text-center border-0 mb-0 w-50">
                  <a className={classNames('nav-link', 'border-0', { active: this.state.activeTab === 'register' })} onClick={() => { this.toggle('register'); }}>
                    <i className="fa fa-bar-chart" aria-hidden="true"/> Register
                  </a>
                </li>
              </ul>

              <div className="tab-content mt-4" id="myTabContent">
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="login">
                    <form onSubmit={this.loginSubmit}>
                      <div className={'form-group' + (loginSubmitted && !loginEmail ? ' has-error' : '')}>
                        <input type="email" name="loginEmail" className="form-control" value={loginEmail} onChange={this.formChange} placeholder="Enter email" autoComplete="off" required/>
                        {loginSubmitted && !loginEmail &&
                          <div className="invalid-feedback">Email is required</div>
                        }
                      </div>
                      <div className={'form-group' + (loginSubmitted && !loginPassword ? ' has-error' : '')}>
                        <input type="password" name="loginPassword" className="form-control" value={loginPassword} onChange={this.formChange} placeholder="Password" autoComplete="off" required/>
                        {loginSubmitted && !loginPassword &&
                          <div className="invalid-feedback">Password is required</div>
                        }
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"/>
                            Remember me
                          </label>
                           <span className="forgot float-right"><a href="#!">Forgot password?</a></span>
                        </div>
                      </div>
                      <button type="submit" className="bg-gradient-theme-left btn-lg btn-block">Log in</button>
                    </form>
                  </TabPane>
                  <TabPane tabId="register">
                    <form onSubmit={this.registerSubmit}>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <input type="text" name="registerusername" className="form-control" value={registerusername} onChange={this.formChange} placeholder="Enter username" autoComplete="" required/>
                        </div>
                       
                        <div className="form-group col-md-12">
                          <input type="email" name="registerEmail" className="form-control" value={registerEmail} onChange={this.formChange} placeholder="Enter email" autoComplete="" required/>
                        </div>
                        <div className="form-group col-md-12">
                          <input type="password" name="registerPassword" className="form-control" value={registerPassword} onChange={this.formChange} placeholder="Password" required/>
                        </div>
                        <div className="form-group col-md-12">
                          <input type="password" className="form-control" placeholder="Repeat Password"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"/>
                            I agree the Terms and Conditions
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="bg-gradient-theme-left btn-lg btn-block">Register</button>
                    </form>
                  </TabPane>
                </TabContent>

              </div>

            </div>

          </div>

        </div>

      </div>

    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

LoginView.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  onLogoClick: PropTypes.func,
};

LoginView.defaultProps = {
  authState: 'LOGIN',
   onLogoClick: () => {},
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedLoginView = connect(mapStateToProps)(LoginView);
export { connectedLoginView as LoginView };