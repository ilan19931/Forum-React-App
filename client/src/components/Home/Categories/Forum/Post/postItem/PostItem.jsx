import React, { useState } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import "./postItem.css";

const PostItem = ({ auth, data }) => {
  return (
    <div className="postItem">
      <div className="postItem-container">
        <div className="postItem-header">
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

        <div className="postItem-body">{data.body}</div>

        <div className="postItem-footer">
          <div className="postItem-action">
            <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
            <span>Like</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
