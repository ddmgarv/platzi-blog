import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/usersActions";
import {
  getPosts,
  getPostsById,
  showComments,
  getComments
} from "../../actions/postsActions";
import Loader from "../utilities/Loader";
import Fatal from "../utilities/Fatal";
import Comments from "./Comments";
class Posts extends Component {
  async componentDidMount() {
    const {
      getUsers,
      getPostsById,
      match: {
        params: { key }
      }
    } = this.props;
    if (!this.props.users) {
      await getUsers(); // usamos async/await para lograr que primero traiga los datos de los usuarios
    }
    if (this.props.usersReducer.error) {
      return;
    }
    if (!("posts_key" in this.props.usersReducer.users[key])) {
      getPostsById(key);
    }
  }
  insertUser = () => {
    const {
      usersReducer,
      match: {
        params: { key }
      }
    } = this.props;
    if (usersReducer.error) {
      return <Fatal error={usersReducer.error} />;
    }
    if (!usersReducer.users || usersReducer.loading) {
      return (
        <div className="centered-container">
          <Loader color={"#02cffd"} />
        </div>
      );
    }
    const { name } = usersReducer.users;
    return <h1>Publicaciones de {name}</h1>;
  };

  insertPosts = () => {
    const {
      usersReducer,
      usersReducer: { users },
      postsReducer,
      postsReducer: { posts },
      match: {
        params: { key }
      }
    } = this.props;

    if (!users || usersReducer.error) return;
    if (postsReducer.error) return <Fatal error={postsReducer.error} />;
    if (!posts.length) return;
    if (!("posts_key" in users)) return;
    const { posts_key } = users;
    return this.showInfo(posts, posts_key);
  };
  showInfo = (posts, posts_key) => {
    return posts[posts_key].map((post, com_key) => (
      <div
        className="post-title"
        key={post.id}
        onClick={() =>
          this.props.showComments(posts_key, com_key, post.comments)
        }
      >
        <h2>{post.title}</h2>
        <h3>{post.body}</h3>
        {post.open ? <Comments /> : "Cerrado"}
      </div>
    ));
  };
  insertComments = (posts_key, com_key, comments) => {
    console.log(comments);
    this.props.showComments(posts_key, com_key);
    this.props.getComments(posts_key, com_key);
  };
  render() {
    return (
      <div>
        {this.insertUser()}
        {this.insertPosts()}
      </div>
    );
  }
}

const mapStateToProps = ({ postsReducer, usersReducer }) => {
  return {
    postsReducer,
    usersReducer
  };
};
const mapDispatchToProps = {
  getUsers,
  getPosts,
  getPostsById,
  showComments,
  getComments
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
