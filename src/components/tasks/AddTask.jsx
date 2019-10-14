import React, { Component } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";
import { send } from "q";

class AddTask extends Component {
  inputHandler = event => {
    const { name, value } = event.target;
    this.props.updateValue(name, value);
  };
  addTask = () => {
    const { title, userId, createTask } = this.props;
    const newTask = {
      title,
      userId,
      completed: false
    };
    createTask(newTask);
  };
  render() {
    return (
      <div>
        <h1>Añadir tarea</h1>
        <div>
          <label htmlFor="">Usuario id: </label>
          <input
            value={this.props.userId}
            type="number"
            name="userId"
            id="userId"
            onChange={this.inputHandler}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Título: </label>
          <input value={this.props.title} type="text" name="title" id="title" />
        </div>
        <br />

        <button type="submit" onClick={this.props.addTask}>
          Crear
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(
  mapStateToProps,
  tasksActions
)(AddTask);
