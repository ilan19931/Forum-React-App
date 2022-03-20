import { useState } from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../redux/actions/alert.actions";

import { register } from "../../redux/actions/user.actions";

import "./register.css";

const Register = ({ register, isAuthenticated }) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    if (password !== password2) {
      setAlert({ alertType: "danger", msg: "passwords doesn't match!" });
    } else {
      register(data);
    }
  }

  return (
    <div className="register">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={handleChange}
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
