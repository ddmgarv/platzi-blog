import React from "react";
import Loader from "../utilities/Loader";
import Fatal from "../utilities/Fatal";
import { connect } from "react-redux";

const Comments = props => {
  console.log(props);
  if (props.postsReducer.com_loading) {
    return <Loader color={"#000"} />;
  }
  if (props.postsReducer.com_error) {
    return <Fatal error={"Error al cargar los comentarios "} />;
  }
  const insertComments = () => {
    if (props.comments.length > 0) {
      return props.comments.map(comment => (
        <li>
          <b>
            <u>{comment.email}</u>
          </b>
          <br />
          {comment.body}
        </li>
      ));
    } else {
      return "No hay comentarios para esta publicación";
    }
  };

  return <ul>{insertComments()}</ul>;
};

const mapStateToProps = postsReducer => postsReducer;

export default connect(mapStateToProps)(Comments);
