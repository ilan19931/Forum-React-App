import axios from "axios";

import { useState } from "react";

import { connect } from "react-redux";

import { login } from "../../redux/actions/user.actions";

import "./login.css";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    if (email && password) {
      await login(data);
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default connect(null, { login })(Login);
