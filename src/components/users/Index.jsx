import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../actions/usersActions";
import Loader from "../utilities/Loader";
class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.props.getUsers();
  }
  insertContent = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Enlace</th>
        </tr>
      </thead>
      <tbody>{this.insertRows()}</tbody>
    </table>
  );
  insertRows = () => {
    return this.props.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.loading ? (
          <div className="centered-container">
            <Loader color={"#02cffd"} />
          </div>
        ) : (
          this.insertContent()
        )}
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  //  recibe todos los reducers en "reducers"
  return reducers.usersReducer; // conectar al component con un reducer en especifico.
};

const mapDispatchToProps = () => {};

export default connect(
  mapStateToProps,
  usersActions
)(Users);
