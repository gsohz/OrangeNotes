import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

//#region Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Goal from "./pages/Goal/Goal";

//#endregion

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path=":id/goal" element={<Goal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
      </Switch>
    </Router>
  );
}

export default Routes;
