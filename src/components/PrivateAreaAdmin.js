import React, { Component } from "react";
class PrivateAreaAdmin extends Component {
  state = { items: [] };

  componentDidMount() {
    this.retrieveList();
  }

  retrieveList = () => {
    let that = this;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        that.setState({ items: JSON.parse(this.responseText) });
      }
    };

    xmlhttp.open("GET", "http://localhost:8080/api/articoli/list", true);
    xmlhttp.setRequestHeader("token", localStorage.getItem("token"));
    xmlhttp.send();
  };

  generateComponents() {
    const components = this.state.items.map(el => {
      return (
        <tr key={el.id}>
          <td>{el.codice}</td>
          <td>{el.descrizione}</td>
          <td>
            <button>Modifica</button>
          </td>
        </tr>
      );
    });
    return components;
  }

  render() {
    let components = this.generateComponents();
    return (
      <div className="container">
        <div className="row">
          <p>
            <button>Inserisci Articolo</button>
          </p>
        </div>
        <div className="row">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Codice</th>
                <th scope="col">Descrizione</th>
                <th scope="col">Modifica</th>
              </tr>
            </thead>
            <tbody>{components}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PrivateAreaAdmin;
