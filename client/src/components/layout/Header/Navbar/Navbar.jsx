import React from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "../../../../redux/actions/user.actions";

import NavbarSearch from "./NavbarSearch/NavbarSearch";
import "./navbar.css";

const Navbar = ({ isAuthenticated, logout }) => {
  const guestLinks = (
    <>
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
    </>
  );

  const userLinks = (
    <>
      <Link to="/">
        <button
          onClick={() => logout()}
          className="btn btn-danger right-nav-item"
        >
          Logout
        </button>
      </Link>
    </>
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

      <div className="right">{isAuthenticated ? userLinks : guestLinks}</div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
