import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

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
  
  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };

  const submitHandler = (e)=> {
    e.preventDefault();

    if(password !== password2){
      toast.error ('password do not match')
    }else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  };
  if(isLoading) {
    <Spinner />
  }

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
