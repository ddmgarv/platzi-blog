import {
  GET_POSTS,
  GET_POSTS_BY_ID,
  LOADING,
  ERROR,
  SHOW_COMMENTS,
  GET_COMMENTS,
  COM_LOADING,
  COM_ERROR
} from "../types/postsTypes";

import * as usersTypes from "../types/usersTypes";

const { GET_USERS } = usersTypes;

export const getPosts = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const data = await fetch("http://jsonplaceholder.typicode.com/posts").then(
      data => data.json()
    );
    dispatch({
      type: GET_POSTS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: `${error.message}, Algo salió mal. Por favor, intente mas tarde.`
    });
  }
};
export const getPostsById = key => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });
  try {
    const { users } = getState().usersReducer; // Usamos la funcion getState para traer el estado actual del componente y sacar de ahi el ID del usuario que estamos haciendo click.
    const { posts } = getState().postsReducer;
    const user_id = users[key].id;
    const data = await fetch(
      `http://jsonplaceholder.typicode.com/posts?userId=${user_id}`
    ).then(data => data.json());
    const newData = data.map(post => ({
      ...post,
      comments: [],
      showComments: false
    }));
    const updated_posts = [...posts, newData];
    const posts_key = updated_posts.length - 1;
    let updated_users = [...users];
    updated_users = {
      ...users[key],
      posts_key
    };
    dispatch({
      type: GET_USERS,
      payload: updated_users
    });
    dispatch({
      type: GET_POSTS_BY_ID,
      payload: updated_posts
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: `${error.message}, Información de usuario no disponible`
    });
  }
};

export const showComments = (post_key, com_key) => (dispatch, getState) => {
  const { posts } = getState().postsReducer;
  const selected = posts[post_key][com_key];
  const updated = {
    ...selected,
    open: !selected.open
  };
  const updated_posts = [...posts];
  updated_posts[post_key] = [...posts[post_key]];
  updated_posts[post_key][com_key] = updated;
  dispatch({
    type: SHOW_COMMENTS,
    payload: updated_posts
  });
};

export const getComments = (post_key, com_key) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: COM_LOADING
  });
  const { posts } = getState().postsReducer;
  const selected = posts[post_key][com_key];
  try {
    const data = await fetch(
      `http://jsonplaceholder.typicode.com/comments?postId=${selected.id}`
    ).then(data => data.json());
    const updated = {
      ...selected,
      comments: data
    };
    const updated_posts = [...posts];
    updated_posts[post_key][com_key] = [...posts[post_key]];
    updated_posts[post_key][com_key] = updated;
    dispatch({
      type: GET_COMMENTS,
      payload: updated_posts
    });
  } catch (error) {
    dispatch({
      type: COM_ERROR
    });
  }
};
