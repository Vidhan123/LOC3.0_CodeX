import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { GlobalProvider } from './GlobalContext';
import TypographyPage from './views/Typography/Typography';
import './index.css';

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

// views
import {AccountBox} from './views/Login/accountBox';

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <GlobalProvider>
  <Router history={hist}>
    <Switch>
      <Route path="/user" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/" component={AccountBox} />
      {/* <Redirect from="/" to="/user/dashboard" /> */}
    </Switch>
  </Router>
  </GlobalProvider>
  ,
  document.getElementById("root")
);
