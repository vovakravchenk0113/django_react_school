import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label, } from 'reactstrap';

// additionally created imports
import { connect } from 'react-redux';
import { userActions } from '../authentication/_actions'

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      activeTab: 'login',

      user: {
        firstName: '' ,
        lastName: '',
        username: '',
        password: ''
      },
      confirmPassword: '',
      loginusername: '',
      loginpassword: '',
      signupSubmitted: false,
      loginSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
    };

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;

    if (this.isSignup) {
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });      
    }
    console.log("username");
    console.log(this.state.user.username);

  }

  loginHandleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log("this.state.loginusername");
    console.log(this.state);
  }

  handleCPChange = event => {
    this.setState({confirmPassword: event.target.value});
  }

  signupSubmit = event => {
    event.preventDefault();
 
      if (this.state.confirmPassword === this.state.user.password) {
        this.setState({ signupSubmitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
          dispatch(userActions.register(user));
          this.changeAuthState(STATE_LOGIN);
        }        
      } else {
        alert("password is not coincident");
      }

    this.changeAuthState();    
  }

  loginSubmit = event => {
    event.preventDefault();
    this.setState({ loginSubmitted: true });
    const { loginusername, loginpassword } = this.state;
    const { dispatch } = this.props;
    if (loginusername && loginpassword) {
        dispatch(userActions.login(loginusername, loginpassword));
    }
  }

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      firstNameLabel,
      firstNameInputProps,
      lastNameLabel,
      lastNameInputProps,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      loginusernameLabel,
      loginusernameInputProps,
      loginpasswordLabel,
      loginpasswordInputProps,
      children,
      onLogoClick,
    } = this.props;
    const { user, signupSubmitted, confirmPassword, loginSubmitted, loginusername, loginpassword } = this.state;
    return (
      <div>
        {this.isSignup && (
          <Form onSubmit={this.signupSubmit}>
          {showLogo && (
            <div className="text-center pb-4">
              <img
                src={logo200Image}
                className="rounded"
                style={{ width: 60, height: 60, cursor: 'pointer' }}
                alt="logo"
                onClick={onLogoClick}
              />
            </div>
          )}
            <FormGroup className={'form-group' + (signupSubmitted && !user.firstName ? ' has-error' : '')}>
              <Label for={firstNameLabel}>{firstNameLabel}</Label>
              <Input {...firstNameInputProps} onChange={this.handleChange} />
              {signupSubmitted && !user.firstName &&
                  <div className="help-block">First Name is required</div>
              }
            </FormGroup>
            <FormGroup className={'form-group' + (signupSubmitted && !user.lastName ? ' has-error' : '')}>
              <Label for={lastNameLabel}>{lastNameLabel}</Label>
              <Input {...lastNameInputProps} onChange={this.handleChange} />
              {signupSubmitted && !user.lastName &&
                <div className="help-block">Last Name is required</div>
              }
            </FormGroup>
            <FormGroup className={'form-group' + (signupSubmitted && !user.username ? ' has-error' : '')}>
              <Label for={usernameLabel}>{usernameLabel}</Label>
              <Input {...usernameInputProps} onChange={this.handleChange} />
              {signupSubmitted && !user.username &&
                  <div className="help-block">Username is required</div>
              }
            </FormGroup>
            <FormGroup className={'form-group' + (signupSubmitted && !user.loginpassword ? ' has-error' : '')}>
              <Label for={passwordLabel}>{passwordLabel}</Label>
              <Input {...passwordInputProps} onChange={this.handleChange} />
              {signupSubmitted && !user.password &&
                  <div className="help-block">Password is required</div>
              }
            </FormGroup>          
            <FormGroup className={'form-group' + (signupSubmitted && !user.confirmPassword ? ' has-error' : '')}>
              <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
              <Input {...confirmPasswordInputProps} onChange={this.handleCPChange} />
              {signupSubmitted && !confirmPassword &&
                  <div className="help-block">ConfirmPassword is required</div>
              }
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
              </Label>
            </FormGroup>
            <hr />
            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={this.signupSubmit}>
              {this.renderButtonText()}
            </Button>

            <div className="text-center pt-1">
              <h6>or</h6>
              <h6>
                {this.isSignup ? (
                  <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                    Login
                  </a>
                ) : (
                  <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                    Signup
                  </a>
                )}
              </h6>
            </div>
          {children}
        </Form>
        )}
        {this.isLogin && (
          <Form onSubmit={this.loginSubmit}>
          {showLogo && (
            <div className="text-center pb-4">
              <img
                src={logo200Image}
                className="rounded"
                style={{ width: 60, height: 60, cursor: 'pointer' }}
                alt="logo"
                onClick={onLogoClick}
              />
            </div>
          )}
            <FormGroup className={'form-group' + (loginSubmitted && !loginusername ? ' has-error' : '')}>
              <Label for={loginusernameLabel}>{loginusernameLabel}</Label>
              <Input {...loginusernameInputProps} onChange={this.loginHandleChange} />
              {loginSubmitted && !loginusername &&
                  <div className="help-block">Username is required</div>
              }
            </FormGroup>
            <FormGroup className={'form-group' + (loginSubmitted && !loginpassword ? ' has-error' : '')}>
              <Label for={loginpasswordLabel}>{loginpasswordLabel}</Label>
              <Input {...loginpasswordInputProps} onChange={this.loginHandleChange} />
              {loginSubmitted && !loginpassword &&
                  <div className="help-block">Password is required</div>
              }
            </FormGroup>          
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
              </Label>
            </FormGroup>
            <hr />
            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={this.loginSubmit}>
              {this.renderButtonText()}
            </Button>

            <div className="text-center pt-1">
              <h6>or</h6>
              <h6>
                {this.isSignup ? (
                  <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                    Login
                  </a>
                ) : (
                  <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                    Signup
                  </a>
                )}
              </h6>
            </div>
            {children}
        </Form>
        )}
      </div>
      

    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  firstNameLabel: PropTypes.string,
  firstNameInputProps: PropTypes.object,
  lastNameLabel: PropTypes.string,
  lastNameInputProps: PropTypes.object,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  loginusernameLabel: PropTypes.string,
  loginusernameInputProps: PropTypes.object,
  loginpasswordLabel: PropTypes.string,
  loginpasswordInputProps:PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  firstNameLabel: 'Fistname',
  firstNameInputProps: {
    type: 'text',
    placeholder: 'John',
    name: 'firstName'
  },
  lastNameLabel: 'LastName',
  lastNameInputProps: {
    type: 'text',
    placeholder: 'Doe',
    name: 'lastName'
  },
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'text',
    placeholder: 'John@doe.com',
    name: 'username',
    required: 'required'
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
    name: 'password',
    required: 'required'
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
    name: 'confirmPassword',
    required: 'required'
  },
  loginusernameLabel: 'Username',
  loginusernameInputProps: {
    type: 'text',
    placeholder: 'John@doe.com',
    name: 'loginusername',
    required: 'required'
  },
  loginpasswordLabel: 'Password',
  loginpasswordInputProps: {
    type: 'password',
    placeholder: 'your password',
    name: 'loginpassword',
    required: 'required'
  },
  onLogoClick: () => {},
};

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
      registering
  };
}

const connectedAuthForm = connect(mapStateToProps)(AuthForm);

export {connectedAuthForm as AuthForm} ;

// export default AuthForm;