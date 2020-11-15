import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoggedIn } from "./LoggedInContext";

function LogIn() {
  const { register: logIn, handleSubmit, errors } = useForm();
  const context = useContext(LoggedIn);
  const onSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:8080/user/login", formData);
      context.setIsLogged(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "#1db954",
          margin: 0,
          padding: 11,
        }}
      >
        Login
      </h1>
      <div
        style={{
          position: "relative",
          textAlign: "center",
          backgroundColor: "#333",
          width: "50%",
          margin: "auto",
          marginTop: "5%",
          padding: 30,
          borderRadius: "7px",
          minWidth: "500px",
          boxShadow:
            "5px 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
        }}
      >
        <form style={{ marginBottom: 25 }} onSubmit={handleSubmit(onSubmit)}>
          <input
            className="searchInput"
            name="email"
            type="email"
            placeholder="Email"
            ref={logIn({
              required: true,
              pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <p style={{ color: "white" }}>{errors.email && "Invalid Email"}</p>
          <input
            className="searchInput"
            name="password"
            type="password"
            placeholder="Password"
            ref={logIn({ required: true })}
          />
          <p style={{ color: "white" }}>
            {errors.password && "Password is required"}
          </p>
          <label style={{ color: "white" }}>Remember Me</label>
          <input name="rememberToken" type="checkbox" ref={logIn()} />
          <br />
          <br />
          <input className="registerButton" type="submit" value="Login" />
        </form>
        <Link
          to={"/register"}
          style={{
            textDecoration: "none",
            position: "absolute",
            right: 20,
            top: 20,
          }}
        >
          <p className="registerButtonWhite">Register Here</p>
        </Link>
      </div>
    </>
  );
}

export default LogIn;
