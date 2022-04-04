import React, { useState } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { likeComment } from "../../../../../../redux/actions/comment.actions";

import "./comment.css";

const Comment = ({ auth, comments, data, main, likeComment }) => {
  const currComment = comments.comments.filter(
    (comment) => comment._id === data._id
  )[0];

  const [likes, setLikes] = useState(currComment?.likes || []);

  function handleLike() {
    likeComment(data._id);
    setLikes([...likes, auth.user._id]);
  }

  function handleUnLike() {
    likeComment(data._id);
    setLikes(likes.filter((like) => like !== auth.user._id));
  }

  return (
    <div className="comment" style={main && { width: "70%" }}>
      <div className="comment-container">
        <div className="comment-header">
          <div className="left">
            <i className="fa-solid fa-user-tie profileAvatar"></i>

            <div className="info">
              <span className="date">03-01-2022 00:44</span>
              <span className="username">
                <Link to={"/profile/" + data.usernameCreated}>
                  {data.usernameCreated}
                </Link>
              </span>
              <span className="userMoto">Welcome to my forum app :D</span>
            </div>
          </div>

          <div className="right">
            <span>2,467</span>
            <i className="fa-solid fa-message icon"></i>
          </div>
        </div>

        <div className="comment-body">{data.body}</div>

        <div className="comment-footer">
          {likes.includes(auth.user._id) ? (
            <div onClick={() => handleUnLike()} className="comment-action">
              <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
              <span>Like ({likes?.length})</span>
            </div>
          ) : (
            <div onClick={() => handleLike()} className="comment-action">
              <i className="fa-solid fa-heart" style={{ color: "black" }}></i>
              <span>Like ({likes?.length})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  comments: state.comments,
});

export default connect(mapStateToProps, { likeComment })(Comment);
