const userRoutes = require("../routes/user.routes");
const categoryRoutes = require("../routes/category.routes");
const forumRoutes = require("../routes/forum.routes");
const postRoutes = require("../routes/post.routes");
const commentRoutes = require("../routes/comment.routes");

module.exports = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/forums", forumRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/posts/comments", commentRoutes);
};
