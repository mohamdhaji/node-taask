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
    const user = rows[0];
    console.log(user)
    if (!user) return res.status(400).json({ message: "you are not registered" });
    if (user.password == password) {
      req.session.email = user.email;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.isLoggedin = true;
      res.redirect("/profile");

    } else {
      return res.json({ loginSuccess: false, message: "Wrong password" });
    }
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
