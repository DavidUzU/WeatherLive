import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { CookiesProvider } from 'react-cookie';

import  LoginComponent   from "./components/Login";
import  RegisterComponent  from "./components/Signup";

import { AddDevice } from "./components/AddDevice";
import { Dashboard } from "./components/Dashboard";
import { ConfigureDevice } from "./components/Configure-device";



class App extends Component {
  render() {
    return (
    <CookiesProvider>
      <React.Fragment>
        <Router>
            <Switch>
              <Route exact path="/" component={LoginComponent} />
              <Route exact path="/register" component={RegisterComponent} />
              <Route path="/configure/:deviceid" component={ConfigureDevice} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/device" component={AddDevice} />
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </Router>
      </React.Fragment>
    </CookiesProvider>
    );
  }
}

export default App;