const {Router} = require("express")
const router = Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.get('/', async (req, res) => {
    const result = await User.findAll();
    res.json(result);
})

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
  
  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isUserExits = await User.findOne({ where: {email: email}});
        if (!isUserExits) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                email,
                password: hashedPassword,
            };
            await User.create(newUser);
            res.json({ msg: '1 user successfully inserted into db' })
        } else {
            res.json({ msg: 'Email already exists' }) 
        }
    } catch (e) {
        res.json({error: e.message})
    }
    // connection.query(
    //   `SELECT * FROM users WHERE email = '${email}'`,
    //   async (err, result) => {
    //     if (!result[0]) {
    //       const hashedPassword = await bcrypt.hash(password, 10);
    //       const newUser = {
    //         name,
    //         email,
    //         created_at: formatDate(new Date()),
    //         password: hashedPassword,
    //       };
    //       connection.query(`INSERT INTO users Set ?`, newUser, (err, result) => {
    //         if (err) {
    //           console.log(err);
    //           res.status(400).json("An error occurred.");
    //         } else {
    //           res.json("1 user successfully inserted into db");
    //         }
    //       });
    //     } else {
    //       res.status(400).send("Email Exits");
    //     }
    //   }
    // );
  });
  
//   router.post("/Login", (req, res) => {
//     const { email, password } = req.body;
//     connection.query(
//       `SELECT * 
//       FROM users 
//       WHERE email = '${email}'`,
//       async (err, result, fields) => {
//         if (err) {
//           res.status(400).json("An error occurred.");
//         } else if (result[0]) {
//           if (await bcrypt.compare(password, result[0].password)) {
//             console.log(result[0].user_ID);
//             const user = result[0].user_ID;
//             const token = jwt.sign({ user }, "my_secret_key");
//             res.json({
//               name: result[0].name,
//               token,
//             });
//           } else {
//             res.status(403).json({ message: "incorrect password" });
//           }
//         }
//       }
//     );
//   });
  
//   router.post("/validate", (req, res) => {
//     jwt.verify(req.body.token, "my_secret_key", (error, data) => {
//       if (error) {
//         res.sendStatus(403);
//       } else {
//         res.send(true);
//       }
//     });
//   });

module.exports = router;