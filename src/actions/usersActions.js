import { GET_USERS, LOADING, ERROR } from "../types/usersTypes";
export const getUsers = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/users").then(
      data => data.json()
    );
    console.log(data);
    dispatch({
      type: GET_USERS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: `${error.message}, Algo salió mal. Por favor, intente mas tarde.`
    });
  }
};
