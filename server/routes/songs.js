const { Router } = require("express");
const router = Router();
const { Artist, Song, Album } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const adminAuth = require('../functions/adminAuth')

router.get("/", async (req, res) => {
  try {
    if (req.query.search) {
      const songs = await Song.findAll({
        where: { title: { [Op.like]: `%${req.query.search}%` } },
        include: [
          {
            model: Album,
            attributes: ["name"],
          },
          {
            model: Artist,
            attributes: ["name"],
          },
        ],
      });
      res.json(songs);
    } else {
      const songs = await Song.findAll({
        include: [
          {
            model: Album,
            attributes: ["name"],
          },
          {
            model: Artist,
            attributes: ["name"],
          },
        ],
      });
      res.json(songs);
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/top", async (req, res) => {
  try {
    const songs = await Song.findAll({
      include: [
        {
          model: Album,
          attributes: ["name"],
        },
        {
          model: Artist,
          attributes: ["name"],
        },
      ],
      limit: 20,
    });
    res.json(songs);
  } catch (e) {
    res.json({ error: e.message });
  }
});

// get artist with all songs and albums.
router.get("/:id", async (req, res) => {
  try {
    const result = await Song.findByPk(req.params.id, {
      include: [
        {
          model: Album,
          attributes: ["name"],
        },
        {
          model: Artist,
          attributes: ["name"],
        },
      ],
    });
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/", adminAuth, async (req, res) => {
  const { body } = req;
  try {
    await Song.create(body);
    res.json({ msg: "1 song added" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Song.destroy({
      where: { id: req.params.id },
    });
    res.send("1 song deleted");
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Song.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(
      updated[0] === 1 ? { msg: "Song updated" } : { msg: "Nothing changed" }
    );
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
