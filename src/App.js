import React, { Component } from "react";
import firebase from "firebase";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Auction from "./connectors/Auction";
import Bid from "./connectors/Bid";
import config from "./config";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config.firebase);
    this.state = {
      user: null
    };
  }

  onUserSignIn = user => {
    this.setState({
      user: user
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        {user ? (
          <div className="f7 mb3">{`Connected as ${user.uid}`}</div>
        ) : null}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (user ? <Home /> : <Redirect to="/login" />)}
          />
          <Route
            path="/auction"
            render={() =>
              user ? <Auction userId={user.uid} /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/bid"
            render={() =>
              user ? <Bid userId={user.uid} /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/login"
            render={props => (
              <Login onUserSignIn={this.onUserSignIn} {...props} />
            )}
          />
        </Switch>

        {user ? (
          <Link className="db mt3" to={"/"}>
            Back to home
          </Link>
        ) : null}
      </div>
    );
  }
}

export default App;
