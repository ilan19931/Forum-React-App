import React from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "../../../../redux/actions/user.actions";

import NavbarSearch from "./NavbarSearch/NavbarSearch";
import "./navbar.css";

const Navbar = ({ auth, logout }) => {
  const guestLinks = (
    <div className="right">
      <Link to="/account/login">
        <button className="btn btn-primary right-nav-item">Login</button>
      </Link>

      <Link to="/account/register">
        <button className="btn btn-primary right-nav-item">Register</button>
      </Link>

      <Link to="/account/login/google">
        <button className="btn btn-danger right-nav-item">
          Login via google
        </button>
      </Link>
    </div>
  );

  const userLinks = (
    <div className="right">
      <p className="welcome-text">
        Welcome,{" "}
        <Link to={`/user/profile/${auth.user._id}`}>
          <b>{auth.user?.email}</b>
        </Link>
      </p>
      <button
        onClick={() => logout()}
        className="btn btn-danger right-nav-item"
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/">
          <img
            src="https://e7.pngegg.com/pngimages/92/187/png-clipart-logo-company-business-creative-company-logo-free-logo-design-template-company.png"
            alt="logo"
          />
        </Link>
        <NavbarSearch />
      </div>

      {auth.isAuthenticated ? userLinks : guestLinks}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
