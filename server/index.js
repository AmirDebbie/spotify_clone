const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

function pad(num) {
  return ("00" + num).slice(-2);
}

// Change the date to SQL date format
function formatDate(date) {
  let dateStr =
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate() + 1);
  return dateStr;
}

app.post("/userRegister", (req, res) => {
  const { name, email, password } = req.body;
  connection.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    async (err, result) => {
      if (!result[0]) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          name,
          email,
          created_at: formatDate(new Date()),
          password: hashedPassword,
        };
        connection.query(`INSERT INTO users Set ?`, newUser, (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).json("An error occurred.");
          } else {
            res.json("1 user successfully inserted into db");
          }
        });
      } else {
        res.status(400).send("Email Exits");
      }
    }
  );
});

app.post("/userLogin", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    `SELECT * 
    FROM users 
    WHERE email = '${email}'`,
    async (err, result, fields) => {
      if (err) {
        res.status(400).json("An error occurred.");
      } else if (result[0]) {
        if (await bcrypt.compare(password, result[0].password)) {
          console.log(result[0].user_ID);
          const user = result[0].user_ID;
          const token = jwt.sign({ user }, "my_secret_key");
          res.json({
            name: result[0].name,
            token,
          });
        } else {
          res.status(403).json({ message: "incorrect password" });
        }
      }
    }
  );
});

app.post("/validateUser", (req, res) => {
  jwt.verify(req.body.token, "my_secret_key", (error, data) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.send(true);
    }
  });
});

app.use(ensureToken);

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    jwt.verify(bearerHeader, "my_secret_key", (error, data) => {
      if (error) {
        res.status(403).send("incoreccet token");
      } else {
        res.token = bearerHeader;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

// POST ENDPOINTS

app.post("/song", (req, res) => {
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  } else {
    const sql = `INSERT INTO songs SET ?`;
    connection.query(sql, body, (err, data) => {
      if (err) res.send(err.message);
      res.send("song success");
    });
  }
});

app.post("/album", (req, res) => {
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  }
  const sql = `INSERT INTO albums SET ?`;
  connection.query(sql, body, (err, data) => {
    if (err) res.send(err.message);
    res.send("album success");
  });
});

app.post("/artist", (req, res) => {
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  }
  const sql = `INSERT INTO artists SET ?`;
  connection.query(sql, body, (err, data) => {
    if (err) res.send(err.message);
    res.send("artist success");
  });
});

app.post("/playlist", (req, res) => {
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  }
  const sql = `INSERT INTO playlists SET ?`;
  connection.query(sql, body, (err, data) => {
    if (err) res.send(err.message);
    res.send("playlist success");
  });
});

// GET ENDPOINTS
app.get("/playlist", (req, res) => {
  let sql;
  if (req.query.search) {
    sql = `SELECT * FROM playlists WHERE playlists.name LIKE '%${req.query.search}%'`;
  } else {
    sql = `SELECT * FROM playlists`;
  }
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

// Gets also album name and artist name
app.get("/song", (req, res) => {
  let sql;
  if (req.query.search) {
    sql = `SELECT songs.*, albums.name As album, artists.name As artist FROM songs
    JOIN artists ON artists.id = songs.artist_id
    JOIN albums ON albums.id = songs.album_id
    WHERE songs.title LIKE '%${req.query.search}%'
    ORDER BY songs.created_at DESC`;
  } else {
    sql = `SELECT songs.*, albums.name As album, artists.name As artist FROM songs
    JOIN artists ON artists.id = songs.artist_id
    JOIN albums ON albums.id = songs.album_id
    ORDER BY songs.created_at DESC`;
  }
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/album", (req, res) => {
  let sql;
  if (req.query.search) {
    sql = `SELECT albums.*, artists.name AS artist FROM albums
    JOIN artists ON albums.artist_id = artists.id
    WHERE albums.name LIKE '%${req.query.search}%'
    ORDER BY albums.created_at DESC`;
  } else {
    sql = `SELECT albums.*, artists.name AS artist FROM albums
    JOIN artists ON albums.artist_id = artists.id
    ORDER BY albums.created_at DESC`;
  }
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/artist", (req, res) => {
  let sql;
  if (req.query.search) {
    sql = `SELECT * FROM artists WHERE artists.name LIKE '%${req.query.search}%'`;
  } else {
    sql = `SELECT * FROM artists`;
  }
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

// Get by id


app.get("/playlist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT * FROM playlists WHERE id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/song/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT * FROM songs WHERE id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/album/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT albums.*, artists.name AS artist 
  FROM albums JOIN artists ON albums.artist_id = artists.id
  WHERE albums.id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/artist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT * FROM artists WHERE id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

// GET TOP 20

app.get("/top_playlist", (req, res) => {
  const sql = `SELECT * FROM playlists LIMIT 20`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/top_song", (req, res) => {
  const sql = `SELECT songs.*, albums.name As album, artists.name As artist FROM songs
  JOIN artists ON artists.id = songs.artist_id
  JOIN albums ON albums.id = songs.album_id 
  ORDER BY songs.created_at DESC
  LIMIT 20`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/top_artist", (req, res) => {
  const sql = `SELECT * FROM artists LIMIT 20`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

app.get("/top_album", (req, res) => {
  const sql = `SELECT albums.*, artists.name AS artist FROM albums
  JOIN artists ON albums.artist_id = artists.id
  ORDER BY albums.created_at DESC
  LIMIT 20`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

// UPDATE ENDPOINTS

app.put("/artist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  }
  const sql = `UPDATE artists SET ? WHERE id = ${req.params.id}`;
  connection.query(sql, body, (err, data) => {
    if (err) res.send(err.message);
    res.send("updated");
  });
});

app.put("/album/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  }
  const sql = `UPDATE albums SET ? WHERE id = ${req.params.id}`;
  connection.query(sql, body, (err, data) => {
    if (err) res.send(err.message);
    res.send("updated");
  });
});

app.put("/song/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  }
  const sql = `UPDATE songs SET ? WHERE id = ${req.params.id}`;
  connection.query(sql, body, (err, data) => {
    if (err) res.send(err.message);
    res.send("updated");
  });
});

app.put("/playlist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const { body } = req;
  if (!body) {
    res.status(400).send("content missing");
  }
  const sql = `UPDATE playlists SET ? WHERE id = ${req.params.id}`;
  connection.query(sql, body, (err, data) => {
    if (err) res.send(err.message);
    res.send("updated");
  });
});

// DELETE ENDPOINTS

app.delete("/artist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `DELETE FROM artists WHERE id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send("DELETED");
  });
});

app.delete("/playlist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `DELETE FROM playlists WHERE id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send("DELETED");
  });
});

app.delete("/song/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `DELETE FROM songs WHERE id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send("DELETED");
  });
});

app.delete("/album/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `DELETE FROM albums WHERE id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send("DELETED");
  });
});

// Get all songs from a single album
app.get("/albumsongs/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT songs.*, albums.name As album, artists.name As artist FROM songs
  JOIN artists ON artists.id = songs.artist_id
  JOIN albums ON albums.id = songs.album_id 
  WHERE songs.album_id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

// Get all songs from a single Artist
app.get("/artistsongs/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT songs.*, albums.name As album, artists.name As artist FROM songs
    JOIN artists ON artists.id = songs.artist_id
    JOIN albums ON albums.id = songs.album_id 
    WHERE songs.artist_id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

// Get all alnums from a single Artist
app.get("/artistalbums/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT albums.*, artists.name As artist FROM albums
    JOIN artists ON artists.id = albums.artist_id
    WHERE albums.artist_id = ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

// Get all songs from a single Playlist
app.get("/playlistsongs/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send("Id must be a number");
  }
  const sql = `SELECT songs.*, albums.name As album, artists.name As artist FROM songs
  JOIN artists ON artists.id = songs.artist_id
  JOIN albums ON albums.id = songs.album_id 
  JOIN songsinplaylists ON songsinplaylists.song_id = songs.id
  WHERE songsinplaylists.playlist_id =  ${req.params.id}`;
  connection.query(sql, (err, data) => {
    if (err) res.send(err.message);
    res.send(data);
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
