import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Spinner from "../../layout/Spinner/Spinner";

import { getAllCategories } from "../../../redux/actions/category.actions";
import { getAllForums } from "../../../redux/actions/forum.actions";

import "./categories.scss";
import { useEffect } from "react";

const Categories = ({ getAllCategories, categories, getAllForums, forums }) => {
  useEffect(() => {
    getAllCategories();
    getAllForums();
  }, [getAllCategories, getAllForums]);

  return categories.loading || forums.loading ? (
    <Spinner />
  ) : (
    <div className="categories">
      <div className="categories-container">
        {categories.categories.length > 0 ? (
          categories.categories.map((category) => (
            <div key={category._id} className="category-container">
              <div className="category-header">
                <span>{category.name}</span>
              </div>

              <div className="category-body">
                <div className="forums-container">
                  {forums.forums.length > 0 ? (
                    forums.forums
                      .filter((forum) => forum.categoryId === category._id)
                      .map((forum) => (
                        <Link key={forum._id} to={"/forum/" + forum._id}>
                          <div className="category-forum">
                            <img
                              src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/05/Target_Corporation_logo_vector.svg.png?auto=format&q=60&fit=max&w=930"
                              alt="forum"
                            />

                            <div className="category-forum-container">
                              <div className="category-forum-header">
                                {forum.name}
                              </div>

                              <p className="category-forum-thread-name">
                                {forum.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                  ) : (
                    <h3>There are no Forums</h3>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>There are no Categories</h3>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  forums: state.forums,
});

export default connect(mapStateToProps, { getAllCategories, getAllForums })(
  Categories
);
