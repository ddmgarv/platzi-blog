import {
  GET_TASKS,
  TASKS_LOADING,
  TASKS_ERROR,
  UPDATE_VALUE
} from "../types/tasksTypes";
export const getTasks = () => async dispatch => {
  dispatch({
    type: TASKS_LOADING
  });
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos").then(
      data => data.json()
    );
    const tasks = {};
    data.map(
      task =>
        (tasks[task.userId] = {
          ...tasks[task.userId],
          [task.id]: {
            ...task
          }
        })
    );
    dispatch({
      type: GET_TASKS,
      payload: tasks
    });
  } catch (error) {
    dispatch({
      type: TASKS_ERROR,
      payload: `${error.message}, Información de las tareas no disponible.`
    });
  }
};

export const updateValue = (name, value) => dispatch => {
  const data = {
    name,
    value
  };
  dispatch({
    type: UPDATE_VALUE,
    payload: data
  });
};
export const createTask = task => dispatch => {
  console.log(task);
  // dispatch({
  //   type: UPDATE_VALUE,
  //   payload: task
  // });
};
