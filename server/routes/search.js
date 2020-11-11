const { Router } = require("express");
const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();
const { Artist, Song, Album, Playlist } = require("../models");
const Sequelize = require("sequelize");

const client = new Client({
  cloud: {
    id: process.env.SEARCH_ID,
  },
  auth: {
    username: process.env.SEARCH_USER,
    password: process.env.SEARCH_PASSWORD,
  },
});

const router = Router();

router.get("/songs", (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = undefined;
  }
  client.search(
    {
      index: "songs",
      body: {
        size,
        query: {
          wildcard: {
            title: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result);
    }
  );
});

router.get("/albums", (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = undefined;
  }
  client.search(
    {
      index: "albums",
      body: {
        size,
        query: {
          wildcard: {
            name: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result);
    }
  );
});

router.get("/artists", (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = undefined;
  }
  client.search(
    {
      index: "artists",
      body: {
        size,
        query: {
          wildcard: {
            name: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result);
    }
  );
});

router.get("/playlists", (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = undefined;
  }
  client.search(
    {
      index: "playlists",
      body: {
        size,
        query: {
          wildcard: {
            name: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result);
    }
  );
});

// router.get("/songs", async (req, res) => {
//   const songs = await Song.findAll({
//     include: [
//       {
//         model: Album,
//         attributes: ["name"],
//       },
//       {
//         model: Artist,
//         attributes: ["name"],
//       },
//     ],
//   });
//   const body = songs.flatMap((doc) => [
//     { index: { _index: "songs", _type: "song" } },
//     doc,
//   ]);
//   const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//   if (bulkResponse.errors) {
//     return res.json(bulkResponse.errors);
//   }
//   const { body: count } = await client.count({ index: "songs" });
//   res.send(count);
// });

// router.get("/playlists", async (req, res) => {
//   const playlists = await Playlist.findAll();
//   const body = playlists.flatMap((doc) => [
//     { index: { _index: "playlists", _type: "playlist" } },
//     doc,
//   ]);
//   const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//   if (bulkResponse.errors) {
//     return res.json(bulkResponse.errors);
//   }
//   const { body: count } = await client.count({ index: "playlists" });
//   res.send(count);
// });

// router.get("/albums", async (req, res) => {
//   const albums = await Album.findAll({
//     include: [
//       {
//         model: Artist,
//         attributes: ["name"],
//       },
//     ],
//     limit: 20,
//   });
//   const body = albums.flatMap((doc) => [
//     { index: { _index: "albums", _type: "album" } },
//     doc,
//   ]);
//   const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//   if (bulkResponse.errors) {
//     return res.json(bulkResponse.errors);
//   }
//   const { body: count } = await client.count({ index: "albums" });
//   res.send(count);
// });

// router.get("/artists", async (req, res) => {
//   const artists = await Artist.findAll();
//   const body = artists.flatMap((doc) => [
//     { index: { _index: "artists", _type: "artist" } },
//     doc,
//   ]);
//   const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//   if (bulkResponse.errors) {
//     return res.json(bulkResponse.errors);
//   }
//   const { body: count } = await client.count({ index: "artists" });
//   res.send(count);
// });

module.exports = router;
