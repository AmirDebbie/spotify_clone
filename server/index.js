const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");

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
    return myTiny.join(" ");
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "momo1momo2",
  database: "spotify_clone",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to my sql!");
});
connection.query("SELECT * FROM artists", (err, result, fields) => {
  if (err) throw err;
});

app.post("/song", (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(400).send("content missing");
    }
    const sql = `INSERT INTO songs SET ?`;
    connection.query(sql, body, function (err, data) {
        if (err) res.send(err.message);
        res.send('song success');
    })
});

app.post("/album", (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(400).send("content missing");
    }
    const sql = `INSERT INTO albums SET ?`;
    connection.query(sql, body, function (err, data) {
        if (err) res.send(err.message);
        res.send('album success');
    })
});

app.post("/artist", (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(400).send("content missing");
    }
    const sql = `INSERT INTO artists SET ?`;
    connection.query(sql, body, function (err, data) {
        if (err) res.send(err.message);
        res.send('artist success');
    })
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
