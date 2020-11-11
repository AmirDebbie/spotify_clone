const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  morgan(function (tokens, req, res) {
    const myTiny = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ];
    if (req.method === "POST" || req.method === "PUT") {
      return myTiny.concat([JSON.stringify(req.body)]).join(" ");
    } else {
      return myTiny.join(" ");
    }
  })
);

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    jwt.verify(bearerHeader, "my_secret_key", (error, decoded) => {
      if (error) {
        res.status(403).send("incorrect token");
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

app.use("/user", require("./routes/users"));
app.use(ensureToken);
app.use("/artist", require("./routes/artists"));
app.use("/playlist", require("./routes/playlists"));
app.use("/song", require("./routes/songs"));
app.use("/album", require("./routes/albums"));

module.exports = app;
