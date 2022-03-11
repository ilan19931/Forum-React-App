require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const applyAllRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());

// add all api routes (endpoints)
applyAllRoutes(app);

// start server
try {
  app.listen(process.env.SERVER_PORT, () => {
    console.log("Server started on port: " + process.env.SERVER_PORT);

    // connect to database
    mongoose.connect(process.env.MONGODB_URL, () => {
      console.log("connected to mongodb");
    });
  });
} catch (err) {
  console.log(err);
}
