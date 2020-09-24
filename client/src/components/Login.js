import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoggedIn } from "./LoggedInContext";
import { useCookies } from "react-cookie";

function LogIn() {
  const { register: logIn, handleSubmit, errors } = useForm();
  const [cookies, setCookie] = useCookies();
  const context = useContext(LoggedIn);
  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post("user/login", formData);
      setCookie("name", data.name);
      setCookie("token", data.token);
      context.setIsLogged(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "white" }}>Login</h1>
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
          <p className="registerButton">Register Here</p>
        </Link>
      </div>
    </>
  );
}

export default LogIn;
