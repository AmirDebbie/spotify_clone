import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Register() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post("userRegister", formData);
      console.log(data);
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "white" }}>Register</h1>

      <div
        style={{
          position: "relative",
          textAlign: "center",
          backgroundColor: "#333",
          width: "50%",
          margin: "auto",
          marginTop: "5%",
          padding: 30,
          border: "solid #1db954 2px",
        }}
      >
        <form style={{ marginBottom: 25 }} onSubmit={handleSubmit(onSubmit)}>
          <input
            className="searchInput"
            name="name"
            type="text"
            placeholder="Name"
            ref={register({ required: true })}
          />
          <br />
          <p style={{color: 'white'}}>{errors.name && "Name is Required"}</p>
          <br />
          <input
            className="searchInput"
            name="email"
            type="email"
            placeholder="Email"
            ref={register({
              required: true,
              pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <br />
          <p style={{color: 'white'}}>{errors.email && "Invalid Email"}</p>
          <br />
          <input
            className="searchInput"
            name="password"
            type="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
          <br />
          <p style={{color: 'white'}}>{errors.password && "Password is required"}</p>
          <br />
          <input className="registerButton" type="submit" value="Register" />
        </form>
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            position: "absolute",
            right: 20,
            top: 20,
          }}
        >
          <p className="registerButton">Login Here</p>
        </Link>
      </div>
    </>
  );
}

export default Register;
