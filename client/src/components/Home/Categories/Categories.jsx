import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Spinner from "../../layout/Spinner/Spinner";

import { getAllCategories } from "../../../redux/actions/category.actions";

import "./categories.css";
import { useEffect } from "react";

const Categories = ({ getAllCategories, categories }) => {
  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return categories.loading ? (
    <Spinner />
  ) : (
    <div className="forums">
      <div className="forums-container">
        {/* category  item loop her */}

        <div className="forum-container">
          <div className="forum-header">
            <span>cat name</span>
          </div>

          <div className="forum-body">
            <div className="subforums-container">
              {/* forum item loop her */}

              <Link to={"/forum/"}>
                <div className="subforum">
                  <img
                    src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png?auto=format&q=60&fit=max&w=930"
                    alt="subforum"
                  />

                  <div className="subForum-container">
                    <div className="subforum-header"> forum name </div>

                    <p className="subforum-post-name">description</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { getAllCategories })(Categories);
