import { useState } from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../redux/actions/user.actions";

import "./login.css";

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    await login(data);
  }

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
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
            <label htmlFor="exampleInputPassword1">Remember Me? </label>
            <input type="checkbox" className="form-check-input" />
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
