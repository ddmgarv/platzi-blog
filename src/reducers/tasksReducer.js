import {
  GET_TASKS,
  TASKS_LOADING,
  TASKS_ERROR,
  UPDATE_VALUE,
  TASK_ADDED,
  TASK_ADDED_ERROR
} from "../types/tasksTypes";
const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: "",
  userId: "",
  title: "",
  goBack: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: "",
        goBack: false
      };
    case TASKS_LOADING:
      return { ...state, loading: true };
    case TASKS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_VALUE:
      if (action.payload.name === "userId") {
        return { ...state, userId: action.payload.value };
      } else {
        return { ...state, title: action.payload.value };
      }
    case TASK_ADDED:
      return {
        ...state,
        tasks: {},
        userId: "",
        title: "",
        loading: false,
        error: "",
        goBack: true
      };
    case TASK_ADDED_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
