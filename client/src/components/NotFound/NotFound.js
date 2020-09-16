import React from "react";
import image from "./bK8m62yC6RqVXXY5nuS6Zi-650-80.jpg.jpg";
import NavAppBar from "../NavAppBar";

function NotFound() {
  return (
    <>
      <NavAppBar />
      <div
        background
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "#111",
          height: "100vh",
        }}
      >
        <h1 style={{ margin: 0, padding: 30 }}>Oops, You Just Got 404</h1>
        <img alt='404' src={image} />
      </div>
    </>
  );
}

export default NotFound;
