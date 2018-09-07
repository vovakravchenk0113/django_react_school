import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, } from 'components/Layout';
import AuthPage from 'pages/AuthPage';
// pages
// import DashboardPage from 'pages/DashboardPage';

import React from 'react';
import { Switch, Router, Route,} from 'react-router-dom';
import './styles/reduction.css';

// added files concerned with authentication
import {connect} from 'react-redux';

import { history } from './authentication/_helpers';
import { alertActions } from './authentication/_actions';
import { PrivateRoute } from './authentication/_components';
import { Home } from './Home';
import { Row, Col} from 'reactstrap';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message &&
          <Row style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Col md={6} lg={4}>
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          </Col>
          </Row>

        }
        <Router history={history}>
          <div className="container-fluid no-gutters">
            <Switch>
              <LayoutRoute
                exact
                path={`${process.env.PUBLIC_URL}/login`}
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_LOGIN} />
                )}
              />
              <LayoutRoute
                exact
                path={`${process.env.PUBLIC_URL}/signup`}
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_SIGNUP} />
                )}
              />       
              <PrivateRoute path={`${process.env.PUBLIC_URL}/`} component={Home} />
            </Switch>
          </div>
        </Router>  
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
