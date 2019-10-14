import {
  GET_TASKS,
  TASKS_LOADING,
  TASKS_ERROR,
  UPDATE_VALUE
} from "../types/tasksTypes";
const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: "",
  userId: 1,
  title: "asd"
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload, loading: false, error: "" };
    case TASKS_LOADING:
      return { ...state, loading: true };
    case TASKS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_VALUE:
      if (action.payload.name === "userId") {
        console.log("im here");
        return { ...state, userId: action.payload.value };
      } else {
        return { ...state, title: action.payload.value };
      }
    default:
      return state;
  }
};
