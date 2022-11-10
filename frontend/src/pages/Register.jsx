import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
    console.log(e.target.value)
  };

  const submitHandler = (e)=> {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>please create an account</p>
        <section className="form">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="please enter a name"
                onChange={changeHandler}
              />
            </div>
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
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="please confirm a password"
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

export default Register;
