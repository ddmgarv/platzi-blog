import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EyeIcon } from "../utilities/Icons";
import { Link } from "react-router-dom";
const UsersTable = ({ users }) => {
  const insertRows = users =>
    users.map((user, key) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
        <td>
          <Link to={`/publicaciones/${key}`}>
            <EyeIcon />
          </Link>
        </td>
      </tr>
    ));
  return (
    <div>
      {console.log(users)}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{insertRows(users)}</tbody>
      </table>
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = reducers => {
  return reducers.usersReducer;
};

export default connect(
  mapStateToProps,
  {}
)(UsersTable);
