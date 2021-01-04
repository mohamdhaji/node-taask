const path = require("path");

const express = require("express");

const router = express.Router();
const User = require("../models/user");
const createUser = require("../models/user");

router.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "register",
    path: "/register",
    formsCSS: true,
  });
});

router.post("/register-user", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const user = new User(firstName, lastName, email, password);
  const register = user.save();
  if (register) res.redirect("/");
  // handle error ....
});

module.exports = router;
