import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardHomePage from "./containers/DashboardHomePage";
import Header from "./containers/Header";
import "./App.css";

function App() {
  const notFoundMessage = '404 Not Found!';
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={DashboardHomePage} />
          <Route>{notFoundMessage}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
