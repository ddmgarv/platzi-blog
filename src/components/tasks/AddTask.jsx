import React, { Component } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";
import Loader from "../utilities/Loader";
import Fatal from "../utilities/Fatal";
import { Redirect } from "react-router-dom";
class AddTask extends Component {
  componentDidMount() {
    const {
      match: {
        params: { userId, taskId }
      },
      tasks,
      updateValue
    } = this.props;
    if (userId && taskId) {
      const task = tasks[userId][taskId];
      console.log(task);
      updateValue("userId", task.userId);
      updateValue("title", task.title);
    }
  }
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
  editTask = () => {
    const {
      match: {
        params: { userId, taskId }
      },
      tasks,
      title,
      add,
      editTask
    } = this.props;

    // editTask();
  };
  disabled = () => {
    const { loading, userId, title } = this.props;

    if (loading) {
      return true;
    } else if (userId && title) {
      return false;
    }
    return true;
  };
  showAction = () => {
    const { loading, error } = this.props;
    if (loading) {
      return <Loader color={"#000"} />;
    } else if (error) {
      return <Fatal error={"Error, intente mas tarde"} />;
    }
  };
  render() {
    return (
      <div>
        {this.props.goBack ? <Redirect to={"/tareas"} /> : ""}
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
          <input
            value={this.props.title}
            onChange={this.inputHandler}
            type="text"
            name="title"
            id="title"
          />
        </div>
        <br />

        <button type="submit" onClick={this.addTask} disabled={this.disabled()}>
          Crear
        </button>
        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(
  mapStateToProps,
  tasksActions
)(AddTask);
