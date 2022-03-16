import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Coupons from "./components/Pages/Coupons/Coupons";
import Contact from "./components/Pages/Contact/Contact";
import Help from "./components/Pages/Help/Help";
import Settings from "./components/Pages/Settings/Settings";
import Login from "./components/Pages/Login/Login";

const PageRouter = (data) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Login {...data} {...props} />}
        />
        <Route
          path="/login"
          render={(props) => <Login {...data} {...props} />}
        />
        <Route
          path="/coupons"
          render={(props) => <Coupons {...data} {...props} />}
        />
        <Route
          path="/contact"
          render={(props) => <Contact {...data} {...props} />}
        />
        <Route path="/help" render={(props) => <Help {...data} {...props} />} />
        <Route
          path="/settings"
          render={(props) => <Settings {...data} {...props} />}
        />
      </Switch>
    </Router>
  );
};

export default PageRouter;
