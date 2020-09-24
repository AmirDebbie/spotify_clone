const { Router } = require("express");
const router = Router();
const { Artist, Song, Album } = require("../models");
const Sequelize = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/top", async (req, res) => {
    try {
      const artists = await Artist.findAll({ limit: 20 });
      res.json(artists);
    } catch (e) {
      res.json({ error: e.message });
    }
  });

// get artist with all songs and albums.
router.get("/:id", async (req, res) => {
  try {
    const result = await Artist.findByPk(req.params.id, {
      include: [Album, Song],
    });
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    await Artist.create(body);
    res.json({msg: "1 artist added"});
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Artist.destroy({
      where: { id: req.params.id }
    });
    res.send("1 artist deleted");
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const updated = await Artist.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(updated[0] === 1 ? {msg: "Artist updated"} : {msg: "Nothing changed"});
    } catch (e) {
      res.json({ error: e.message });
    }
  });

module.exports = router;
