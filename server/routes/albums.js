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
      const albums = await Album.findAll({
        include: [
          {
            model: Artist,
            attributes: ["name"],
          },
        ],
        where: { name: { [Op.like]: `%${req.query.search}%` } },
      });
      res.json(albums);
    } else {
      const albums = await Album.findAll({
        include: [
          {
            model: Artist,
            attributes: ["name"],
          },
        ],
      });
      res.json(albums);
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/top", async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: [
        {
          model: Artist,
          attributes: ["name"],
        },
      ],
      limit: 20,
    });
    res.json(albums);
  } catch (e) {
    res.json({ error: e.message });
  }
});

// get album with all songs
router.get("/:id", async (req, res) => {
  try {
    const result = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Artist,
          attributes: ["name"],
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
    const created = await Album.create(body);
    const result = await Album.findByPk(created.dataValues.id, {
      include: [
        {
          model: Artist,
          attributes: ["name"],
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
    await postByIndex("albums", result);
    res.json({ msg: "1 album added" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Album.destroy({
      where: { id: req.params.id },
    });
    res.send("1 album deleted");
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Album.update(req.body, {
      where: { id: req.params.id },
    });

    await updateByIndexAndId("albums", req.params.id, req.body);

    res.json(
      updated[0] === 1 ? { msg: "album updated" } : { msg: "Nothing changed" }
    );
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
