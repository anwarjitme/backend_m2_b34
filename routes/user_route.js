const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel}=require("../model/user_model")
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name,email,password,isAdmin} = req.body;
  try {
 const encryp_password = await bcrypt.hash(password, 3);
    const new_user = new UserModel({
        name:name,
      email: email,
      password: encryp_password,
      isAdmin:isAdmin
    });
    await new_user.save();
    res.status(201).json({"msg":"successfully registered"});
  } catch (err) {
    res.status(500).json({"msg":"something wrong !"});
  }
});
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({"msg":"something wrong !"});
    }

    const dcryp_password = await bcrypt.compare(password, user.password);
    if (!dcryp_password) {
      return res.status(401);
    }
    const key = {
        user: {
            id: user.id
        }
    };

    jwt.sign(key, 'masai', (error, token) => {
        if (error) throw error;
        res.json({ token });
    });
  } catch (err) {
  res.json({"msg":"Something wrong !"})
  }
});

module.exports = {
  userRoute
};

