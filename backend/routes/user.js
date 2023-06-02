const express = require("express");
const UserModel = require("../models/User");

const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    const result = await UserModel.find({}).sort().limit();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log(user.password);
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("incorrect");
      }
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.status(500).json("fail");
  }
});

module.exports = router;
