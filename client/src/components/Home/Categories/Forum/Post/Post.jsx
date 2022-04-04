import React, { useEffect } from "react";
import Comment from "./comment/Comment";

import { connect } from "react-redux";

import Spinner from "../../../../layout/Spinner/Spinner";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  getAllComments,
  addComment,
} from "../../../../../redux/actions/comment.actions";

import { getPost } from "../../../../../redux/actions/post.actions";

import "./post.css";
import PostItem from "./postItem/PostItem";

const Post = ({
  auth,
  comments,
  getAllComments,
  addComment,
  getPost,
  post,
}) => {
  const [isShowComment, setIsShowComment] = useState(false);

  const [newCommentBody, setNewCommentBody] = useState("");

  const params = useParams();

  function showAddComment() {
    setIsShowComment(!isShowComment);
  }

  useEffect(() => {
    getPost(params.postId);
    getAllComments(params.postId);
  }, [getAllComments, getPost]);

  return auth.loading || comments.loading || post.loading ? (
    <Spinner />
  ) : (
    <div className="thread">
      <div className="postItem-title">{post.post.title}</div>
      <PostItem data={post.post} />

      <div className="comments">
        <div className="comments-header">
          <span>Comments</span>
        </div>

        {comments.comments?.length === 0 ? (
          <div className="emptyComments">There are no comments.</div>
        ) : (
          comments.comments?.map((comment) => (
            <Comment key={comment._id} data={comment} />
          ))
        )}
      </div>

      {auth.isAuthenticated && (
        <div className="addComment">
          {!isShowComment && (
            <button
              onClick={() => showAddComment()}
              className="btn btn-primary"
            >
              Add Comment
            </button>
          )}

          {isShowComment && (
            <div className="hidden-form">
              <form onSubmit={() => addComment()}>
                <div className="form-group">
                  <label>Text:</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter your comment here"
                    value={newCommentBody}
                    onChange={(e) => setNewCommentBody(e.target.value)}
                    cols="5"
                    rows="5"
                  ></textarea>
                </div>
                <button className="btn btn-primary">Add Comment</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  comments: state.comments,
  post: state.post,
});

export default connect(mapStateToProps, { getAllComments, getPost })(Post);
