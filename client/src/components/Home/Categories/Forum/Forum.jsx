// icons
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailIcon from "@mui/icons-material/Mail";

import { Link } from "react-router-dom";
import { useParams } from "react-router";

import { connect } from "react-redux";
import { getForumById } from "../../../../redux/actions/forum.actions";

import "./forum.scss";
import { useEffect } from "react";

import Spinner from "../../../layout/Spinner/Spinner";

const Forum = ({ getForumById, auth, forum }) => {
  const { forumId } = useParams();
  const { posts } = forum;

  useEffect(() => {
    getForumById(forumId);
  }, [getForumById, forumId]);

  return forum.loading || posts?.loading || auth.loading ? (
    <Spinner />
  ) : (
    <div className="forum">
      <div className="forum-container">
        <div className="forum-header">{forum.name}</div>

        <div className="posts-container">
          <div className="post-headers grid">
            <span style={{ textAlign: "left", marginLeft: "0.8rem" }}>
              post info{" "}
            </span>
            <span>Statistics </span>
            <span>Last Comment </span>
          </div>

          {posts?.length === 0 ? (
            <h2 style={{ marginTop: "4rem" }}>There are no posts to show</h2>
          ) : (
            posts?.map((post) => (
              <div key={post._id} className="post-item grid">
                <div className="post-body">
                  <div className="post-status">
                    <MailIcon className="status" />
                  </div>

                  <div className="post-inner-body">
                    <Link to={"/post/" + post._id}>
                      <p>{post.title}</p>
                    </Link>

                    <span>
                      by
                      <Link to={"/accounts/profile/" + post.usernameCreated}>
                        <span>{post.usernameCreated} </span>
                      </Link>
                      at {post.createdAt}
                    </span>
                  </div>
                </div>

                <div className="post-stats">
                  <div>
                    <CommentIcon />
                    <span>{post.comments.length}</span>
                  </div>

                  <div>
                    <VisibilityIcon />
                    <span>{post.views}</span>
                  </div>
                </div>

                <div className="post-last-activity">
                  <span>TestUser</span>

                  <span>Yesterday, 22:48 PM</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="forum-right-side">
        <h2>{forum.name}</h2>
        <p>{forum.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  forum: state.forums.forum,
});

export default connect(mapStateToProps, { getForumById })(Forum);
