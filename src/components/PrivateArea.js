import React, { Component } from "react";
class PrivateArea extends Component {
  state = { outputMsg: "" };

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser() {
    let that = this;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        that.setState({ outputMsg: this.response });
      }
    };

    xmlhttp.open("GET", "http://localhost:8080/api/user/getNome", true);
    xmlhttp.setRequestHeader("token", this.props.token);
    xmlhttp.send();
  }

  render() {
    return <p>{this.state.outputMsg}</p>;
  }
}

export default PrivateArea;
