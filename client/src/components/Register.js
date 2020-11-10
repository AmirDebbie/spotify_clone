import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Register() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post("user/register", formData);
      console.log(data);
      history.push("/");
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
        Register
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
            name="name"
            type="text"
            placeholder="Name"
            ref={register({ required: true })}
          />
          <br />
          <p style={{ color: "white" }}>{errors.name && "Name is Required"}</p>
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
          <p style={{ color: "white" }}>{errors.email && "Invalid Email"}</p>
          <br />
          <input
            className="searchInput"
            name="password"
            type="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
          <br />
          <p style={{ color: "white" }}>
            {errors.password && "Password is required"}
          </p>
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
          <p className="registerButtonWhite">Login Here</p>
        </Link>
      </div>
    </>
  );
}

export default Register;
