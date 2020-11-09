const { Router } = require("express");
const router = Router();
const { Artist, Song, Album, Playlist, Playlists_song } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  try {
    if (req.query.search) {
      const playlists = await Playlist.findAll({
        where: { name: { [Op.like]: `%${req.query.search}%` } },
      });
      res.json(playlists);
    } else {
      const playlists = await Playlist.findAll();
      res.json(playlists);
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/top", async (req, res) => {
  try {
    const playlists = await Playlist.findAll({ limit: 20 });
    res.json(playlists);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    await Playlist.create(body);
    res.json({ msg: "1 playlist added" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Playlist.destroy({
      where: { id: req.params.id },
    });
    res.send("1 playlist deleted");
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Playlist.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(
      updated[0] === 1
        ? { msg: "Playlist updated" }
        : { msg: "Nothing changed" }
    );
  } catch (e) {
    res.json({ error: e.message });
  }
});

// get all songs from a playlist
router.get("/:id", async (req, res) => {
  try {
    let result = await Playlist.findByPk(req.params.id, {
      include: [
        {
          model: Playlists_song,
          where: { playlist_id: req.params.id },
          include: [
            {
              model: Song,
              include: [
                {
                  model: Artist,
                  attributes: ["name"],
                },
                {
                  model: Album,
                  attributes: ["name"],
                },
              ],
            },
          ],
          attributes: ["id"],
        },
      ],
    });
    for (let i = 0; i < result.Playlists_songs.length; i++) {
      result.Playlists_songs[i] = result.Playlists_songs[i].Song;
    }
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
