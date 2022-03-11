import React from "react";

import PopularPosts from "./PopularPosts/PopularPosts";
import Forums from "./Forums/Forums";

const Home = () => {
  return (
    <div>
      <PopularPosts />
      <Forums />
    </div>
  );
};

export default Home;
