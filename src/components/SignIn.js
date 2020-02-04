import React from "react";
import User from "../data/user";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", validateResult: "" };
    this.changeUser = this.changeUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeUser(event) {
    var inputUser = event.target.value;
    this.setState({ username: inputUser });
  }

  changePassword(event) {
    var inputPassword = event.target.value;
    this.setState({ password: inputPassword });
  }

  assignTokenAndUser(token, user) {
    this.props.loginCallback(token, user);
  }

  changeValidateResult(statusMsg) {
    this.setState({ validateResult: statusMsg });
  }

  submit() {
    let that = this;
    var inputUser = this.state.username;
    var inputPassword = this.state.password;
    if (
      inputUser.localeCompare("") === 0 ||
      inputPassword.localeCompare("") === 0
    ) {
      this.setState({ validateResult: "Riempire tutti i campi !" });
    } else {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        let outPutMsg = "";
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          let user = new User(
            response.nome,
            response.cognome,
            response.email,
            response.admin
          );
          that.assignTokenAndUser(this.getResponseHeader("token"), user);
          outPutMsg = "Login effettuato correttamente";
        } else {
          outPutMsg = "Password e/o email sbagliata";
        }
        that.changeValidateResult(outPutMsg);
      };

      xmlhttp.open(
        "POST",
        "http://localhost:8080/api/user/signin?email=" +
          this.state.username +
          "&password=" +
          this.state.password,
        true
      );
      xmlhttp.send();
    }
  }

  render() {
    return (
      <>
        <span className="badge badge-pill badge-primary">email : </span>{" "}
        <input type="text" onChange={this.changeUser}></input>
        &nbsp;
        <span className="badge badge-pill badge-primary">password : </span>{" "}
        <input type="text" onChange={this.changePassword}></input>
        &nbsp;
        <button onClick={this.submit}>SignIn</button>
        <p>{this.state.validateResult}</p>
      </>
    );
  }
}

export default SignIn;
