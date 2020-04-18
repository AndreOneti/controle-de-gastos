import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import GlobalStyles from './styles/global';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/login"> <Login /> </Route>
          <Route path="/">  <Login /> </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
