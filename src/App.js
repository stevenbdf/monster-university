import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { ProtectedRoute, ProtectedRouteManager } from './utils/protectedRoute'
import LoginCandidate from './containers/login_candidate'
import RegisterCandidate from './containers/register_candidate'
import Request from './containers/requests'
import ProfileCandidate from './containers/profile_candidate'
import LoginManager from './containers/login_manager'
import RegisterManager from './containers/register_manager'
import Dashboard from './containers/dashboard'
import ProfileManager from './containers/profile_manager'
import Managers from './containers/managers'
import Careers from './containers/careers'
import Institutions from './containers/institutions'
import Titles from './containers/titles'
import ForgotPasswordCandidate from './containers/forgot_password_candidate'
import ForgotPasswordManager from './containers/forgot_password_manager'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LoginCandidate} />
          <Route exact path="/register" component={RegisterCandidate} />
          <Route exact path="/forgot_password" component={ForgotPasswordCandidate} />
          <ProtectedRoute exact path="/request" component={Request} />
          <ProtectedRoute exact path="/profile_candidate" component={ProfileCandidate} />
          <Route exact path="/manager" component={LoginManager} />
          <Route exact path="/register_manager" component={RegisterManager} />
          <Route exact path="/forgot_password_manager" component={ForgotPasswordManager} />
          <ProtectedRouteManager exact path="/dashboard" component={Dashboard} />
          <ProtectedRouteManager exact path="/profile_manager" component={ProfileManager} />
          <ProtectedRouteManager exact path="/managers" component={Managers} />
          <ProtectedRouteManager exact path="/careers" component={Careers} />
          <ProtectedRouteManager exact path="/institutions" component={Institutions} />
          <ProtectedRouteManager exact path="/titles" component={Titles} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
