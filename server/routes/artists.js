const { Router } = require("express");
const router = Router();
const { Artist, Song, Album } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const adminAuth = require("../functions/adminAuth");
const updateByIndexAndId = require("../elastic/elasticUpdate");
const postByIndex = require("../elastic/elasticAdd");

router.get("/", async (req, res) => {
  try {
    if (req.query.search) {
      const artists = await Artist.findAll({
        where: { name: { [Op.like]: `%${req.query.search}%` } },
      });
      res.json(artists);
    } else {
      const artists = await Artist.findAll();
      res.json(artists);
    }
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
      include: [
        {
          model: Album,
          include: [
            {
              model: Artist,
              attributes: ["name"],
            },
          ],
        },
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
    });
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/", adminAuth, async (req, res) => {
  const { body } = req;
  try {
    const created = await Artist.create(body);
    const result = await Artist.findByPk(created.dataValues.id, {
      include: [
        {
          model: Album,
          include: [
            {
              model: Artist,
              attributes: ["name"],
            },
          ],
        },
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
    });
    await postByIndex("artists", result);
    res.json({ msg: "1 artist added" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Artist.destroy({
      where: { id: req.params.id },
    });
    res.send("1 artist deleted");
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Artist.update(req.body, {
      where: { id: req.params.id },
    });

    await updateByIndexAndId("artists", req.params.id, req.body);

    res.json(
      updated[0] === 1 ? { msg: "Artist updated" } : { msg: "Nothing changed" }
    );
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
