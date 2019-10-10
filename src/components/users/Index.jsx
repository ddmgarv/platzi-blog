import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../actions/usersActions";
import Loader from "../utilities/Loader";
import Fatal from "../utilities/Fatal";
import UsersTable from "./UsersTable";

class Users extends Component {
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers();
    }
  }

  insertContent = () => {
    if (this.props.loading) {
      return (
        <div className="centered-container">
          <Loader color={"#02cffd"} />
        </div>
      );
    }
    if (this.props.error) {
      return <Fatal error={this.props.error} />;
    } else {
      return <UsersTable />;
    }
  };

  render() {
    return (
      <div>
        <h2>Usuarios</h2>
        {this.insertContent()}
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
