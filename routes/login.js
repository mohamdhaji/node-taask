const path = require("path");

const express = require("express");
const db = require("../util/database");

const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
  res.render("login", {
    pageTitle: "login",
    path: "/",
    formsCSS: true,
  });
});
router.post("/login-user", (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  const sql = "SELECT * FROM users WHERE users.email = ?";
  db.query(sql, [email], (err, rows) => {
    if (err) return false;
    const user = rows[0];
    if (!user) res.status(400).json({ message: "you are not registered" });
    if (user.password == password) {
      // res.cookie("isLoggedIn", true);
      // res.cookie("user", user);

      res.render("profile", {
        user: user,
        pageTitle: "user profile",
        path: "profile",
      });
    } else {
      return res.json({ loginSuccess: false, message: "Wrong password" });
    }
  });
  // console.log(user);
  // if (!user) res.status(400).json({ message: "you are not registered" });
  // if (user.password == password) {
  //   req.session.isLoggedIn = true;
  //   req.session.user = user;
  //   console.log("loggedIn");
  //   req.session.save((err) => {
  //     res.render("user/profile", {
  //       user: user,
  //       pageTitle: "user profile",
  //       path: "/user/profile",
  //     });
  //   });
  // } else {
  //   console.log("oh");
  //   return res.json({ loginSuccess: false, message: "Wrong password" });
  // }
});

module.exports = router;
