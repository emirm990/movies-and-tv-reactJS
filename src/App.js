import React, { Component } from "react";
import Movies from "./components/Movies";
import Details from "./components/Details";
import { HashRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={Movies} exact />
          <Route path='/details' component={Details} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
