import React from "react";

import PopularPosts from "./PopularPosts/PopularPosts";
import Categories from "./Categories/Categories";

const Home = () => {
  return (
    <div>
      <PopularPosts />
      <Categories />
    </div>
  );
};

export default Home;
