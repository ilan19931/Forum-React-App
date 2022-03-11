import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { connect } from "react-redux";

import {
  Header,
  Home,
  Login,
  Register,
  Forum,
  Post,
  Footer,
  Alerts,
} from "./components";

import "./App.css";

const App = () => {
  return (
    <div className=".container-fluid App">
      <Header />
      <Alerts />

      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />

          <Route path="/forum/:forumId" element={<Forum />} />
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default connect()(App);
