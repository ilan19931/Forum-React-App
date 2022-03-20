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

import { loadUser } from "./redux/actions/user.actions";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className=".container-fluid App">
      <Header />

      <div className="alerts">
        <Alerts />
      </div>

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

export default connect(null, { loadUser })(App);
