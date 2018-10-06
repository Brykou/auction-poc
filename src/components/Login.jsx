import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import Message from "./Message";

class App extends React.Component {
  static propTypes = {
    onUserSignIn: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: null
    };
  }

  handleChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
    const { email, password } = this.state;
    const { onUserSignIn } = this.props;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(e => {
        onUserSignIn(e.user);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          message: "Wrong credentials"
        });
      });
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="email">
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Login</button>
        <Message message={message} />
      </div>
    );
  }
}

export default App;
