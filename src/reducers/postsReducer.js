import {
  GET_POSTS,
  LOADING,
  ERROR,
  GET_POSTS_BY_ID,
  SHOW_COMMENTS,
  GET_COMMENTS,
  COM_LOADING,
  COM_ERROR
} from "../types/postsTypes";
const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: "",
  com_loading: false,
  com_error: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false, error: "" };
    case GET_POSTS_BY_ID:
      return { ...state, posts: action.payload, loading: false, error: "" };
    case SHOW_COMMENTS:
      return { ...state, posts: action.payload };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case COM_LOADING:
      return { ...state, com_loading: true };
    case GET_COMMENTS:
      return { ...state, posts: action.payload, com_loading: false };
    case COM_ERROR:
      return {
        ...state,
        com_error: true,
        com_loading: false
      };
    default:
      return state;
  }
};
