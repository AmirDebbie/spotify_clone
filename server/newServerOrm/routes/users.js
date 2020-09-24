const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUserExits = await User.findOne({ where: { email: email } });
    if (!isUserExits) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };
      await User.create(newUser);
      res.json({ msg: "1 user successfully inserted into db" });
    } else {
      res.json({ msg: "Email already exists" });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const userId = user.user_id;
        const token = jwt.sign({ userId }, "my_secret_key");
        res.json({
          name: user.name,
          token,
        });
      } else {
        res.status(403).json({ message: "incorrect password" });
      }
    } else {
      res.status(403).json({ message: "User doesn't Exists" });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/validate", (req, res) => {
  jwt.verify(req.body.token, "my_secret_key", (error, data) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.send(true);
    }
  });
});

module.exports = router;
