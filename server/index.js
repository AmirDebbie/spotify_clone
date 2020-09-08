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
  console.log(result);
});

app.post("/song", (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    } 
    const { youtube_link, album_id, artist_id, title, length, track_number, lyrics, upload_at, created_at } = req.body;

    var sql = `INSERT INTO songs 
                (
                    youtube_link, album_id, artist_id, title, length, track_number, lyrics, upload_at, created_at
                )
                VALUES
                (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?
                )`;
    connection.query(sql, [youtube_link, album_id, artist_id, title, length, track_number, lyrics, upload_at, created_at], function (err, data) {
        if (err) throw err;
        console.log('success')
        res.send('good');
    });
});

app.post("/artist", (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    } 
    const { name, cover_img, upload_at } = req.body;

    var sql = `INSERT INTO artists 
                (
                    name, cover_img, upload_at
                )
                VALUES
                (
                    ?, ?, ?
                )`;
    connection.query(sql, [name, cover_img, upload_at], function (err, data) {
        if (err) throw err;
        console.log('success')
        res.send('good');
    });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
