import React from "react";
import "../css/Home.css";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import PrivateAreaUser from "./PrivateAreaUser.js";
import PrivateAreaAdmin from "./PrivateAreaAdmin.js";
import Logout from "./Logout.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginToken: "", menu: "", user: null };
    this.changeMenuState = this.changeMenuState.bind(this);
    this.changeUserState = this.changeUserState.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    this.setState({ loginToken: token, user: user });
  }

  changeUserState(token, user) {
    this.setState({ loginToken: token, user: user });
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    console.log(this.state.loginToken);
  }

  changeMenuState(state) {
    this.setState({ menu: state });
  }

  render() {
    var toRender = <span></span>;
    switch (this.state.menu) {
      case "SIGNIN":
        toRender = <SignIn loginCallback={this.changeUserState}></SignIn>;
        break;
      case "SIGNUP":
        toRender = <SignUp></SignUp>;
        break;
      case "PRIVATE_AREA":
        if (this.state.loginToken.localeCompare("") === 0) {
          toRender = <p>Per accedere effettuare il login!</p>;
          break;
        }
        if (this.state.user.isAdmin == true) {
          toRender = <PrivateAreaAdmin></PrivateAreaAdmin>;
        } else {
          toRender = <PrivateAreaUser></PrivateAreaUser>;
        }
        break;
      case "LOGOUT":
        toRender = <Logout loginCallback={this.changeUserState}></Logout>;
    }

    return (
      <div className="container">
        <p>
          <button onClick={() => this.changeMenuState("SIGNIN")}>Accedi</button>
        </p>
        <p>
          <button onClick={() => this.changeMenuState("SIGNUP")}>
            Registrati
          </button>
        </p>
        <p>
          <button onClick={() => this.changeMenuState("PRIVATE_AREA")}>
            Area Personale
          </button>
        </p>
        <p>
          <button onClick={() => this.changeMenuState("LOGOUT")}>Logout</button>
        </p>
        {toRender}
      </div>
    );
  }
}

export default Home;
