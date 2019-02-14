import React, { Component } from "react";
import Movies from "./components/Movies";
import Details from "./components/Details";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/' component={Movies} exact />
          <Route path='/details' component={Details} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
