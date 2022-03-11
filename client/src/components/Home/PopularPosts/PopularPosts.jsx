import { Link } from "react-router-dom";
import "./popularPosts.css";

const popularThreads = [
  {
    title: "test title",
    categoryImage:
      "https://img.freepik.com/free-photo/bridge-crossing-lake_1088-575.jpg?w=1060",
  },
  {
    title: "test title2",
    categoryImage:
      "https://img.freepik.com/free-photo/mountain-journey_1163-3320.jpg?w=1060",
  },
  {
    title: "test title3",
    categoryImage:
      "https://img.freepik.com/free-photo/tropical-foliage-textured-pattern-background_53876-138189.jpg?w=360",
  },
  {
    title: "test title4",
    categoryImage:
      "https://img.freepik.com/free-photo/sunrise-mist-mountains-blue-nature_1417-40.jpg?w=1060",
  },
  {
    title: "test title5 sfdsfdsf sdfs dfsdf",
    categoryImage:
      "https://img.freepik.com/free-photo/milford-sound-new-zealand-travel-destination-concept_53876-42945.jpg?w=1060",
  },
];

const PopularPosts = () => {
  return (
    <div className="popularPosts">
      <div className="popularThreads-header">
        <h2 className="text-center">Top 10 Posts from all forums</h2>
      </div>

      <div className="popularPosts-container">
        {popularThreads.map((post, index) => (
          <div className="card post" key={index}>
            <Link to={"/forums/thread/" + index}>
              <div className="card post">
                <img
                  className="card-img-top"
                  src={post.categoryImage}
                  alt="forum"
                />

                <div className="card-body">
                  <div className="card-title">{post.title}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
