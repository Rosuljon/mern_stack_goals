import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {login,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isSeccess, isError, message} = useSelector((state)=>state.auth)
  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    if(isSeccess || user){
      navigate('/')
    }

    dispatch(reset());
    
  }, [user, isError, isSeccess, message, navigate, dispatch])
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
    const userData = {
      email,
      password,
    }
    dispatch(login(userData));
  };

  if(isLoading){
    return <Spinner />
  }

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
