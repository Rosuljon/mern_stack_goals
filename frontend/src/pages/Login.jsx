import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };

  const submitHandler = (e)=> {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start setting goals</p>
        <section className="form">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="please enter an e-mail"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="please enter a password"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block" type="submit">Submit</button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default Login;
