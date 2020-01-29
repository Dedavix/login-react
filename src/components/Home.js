import React from 'react';
import '../css/Home.css';
import SignIn from './SignIn.js'
import SignUp from './SignUp.js'
import PrivateArea from './PrivateArea.js'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loginToken: "", menu: "" };

    this.changeTokenState = this.changeTokenState.bind(this);
    this.changeMenuState = this.changeMenuState.bind(this);
  }

  changeTokenState(token) {
    this.setState({loginToken: token});
  }

  changeMenuState(state) {
    this.setState({ menu: state });
  }

  render() {
    var toRender = <span></span>;
    switch(this.state.menu){
      case "SIGNIN" : toRender = <SignIn loginCallback = {this.changeTokenState}></SignIn>;
        break;
      case "SIGNUP" : toRender = <SignUp></SignUp>;
        break;
      case "PRIVATE_AREA" : toRender = <PrivateArea></PrivateArea>;
        break;
    }

    return (
      <div className = "container">
        <p><a href = "#" onClick={(e) => this.changeMenuState("SIGNIN")}>Accedi</a></p>
        <p><a href = "#" onClick={(e) => this.changeMenuState("SIGNUP")}>Registrati</a></p>
        <p><a href = "#" onClick={(e) => this.changeMenuState("PRIVATE_AREA")}>Area Personale</a></p>
        {toRender}
      </div>
    );
  }
}

export default Home;
