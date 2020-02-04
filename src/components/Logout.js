import React, { Component } from "react";
class Logout extends Component {
  componentDidMount() {
    this.resetUser("", null);
  }
  resetUser(token, user) {
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    this.props.loginCallback(token, user);
  }

  render() {
    return <p>Logout effettuato correttamente</p>;
  }
}

export default Logout;
