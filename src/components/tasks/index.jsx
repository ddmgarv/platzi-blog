import React, { Component } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";
import Fatal from "../utilities/Fatal";
import Loader from "../utilities/Loader";
import { Link } from "react-router-dom";
class Tasks extends Component {
  componentDidMount() {
    this.props.getTasks();
  }
  showContent = () => {
    const { error, loading, tasks } = this.props;
    if (loading) {
      return <Loader color={"#000"} />;
    } else if (error !== "") {
      return <Fatal error={"Ocurrió un error al cargar las tareas"} />;
    } else {
      return Object.keys(tasks).map(userId => (
        <div key={userId}>
          <h2>{userId}</h2>
          <div className="tasks">{this.insertTasks(userId)}</div>
        </div>
      ));
    }
  };
  insertTasks = userId => {
    const { tasks } = this.props;
    const user_tasks = {
      ...tasks[userId]
    };
    return Object.keys(user_tasks).map(taskId => (
      <div key={taskId}>
        <input type="checkbox" defaultChecked={user_tasks[taskId].completed} />
        {user_tasks[taskId].title}
      </div>
    ));
  };
  render() {
    return (
      <div>
        <button>
          <Link to="/tareas/añadir-tarea">Agregar</Link>
        </button>
        {this.showContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(
  mapStateToProps,
  tasksActions
)(Tasks);
