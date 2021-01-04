const express = require("express");
const db = require("../util/database");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/profile", (req, res, next) => {
  if (req.session.isLoggedin) {
    const firstName = req.session.firstName;
    const lastName = req.session.lastName;
    const email = req.session.email;
    const user = {
      firstName,
      lastName,
      email,
    };
    res.render("profile", {
      user: user,
      pageTitle: "login",
      path: "/profile",
      profileCSS: true,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/updateProfile", (req, res, next) => {
  if (req.session.isLoggedin) {
    const firstName = req.session.firstName;
    const lastName = req.session.lastName;
    const email = req.session.email;
    const user = {
      firstName,
      lastName,
      email,
    };
    res.render("updateProfile", {
      user: user,
      pageTitle: "login",
      path: "/updateProfile",
      profileCSS: true,
    });
  } else {
    res.redirect("/");
  }
});
router.post("/updateProfile", (req, res, next) => {
  if (req.session.isLoggedin) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.session.email;

    if (!firstName || !lastName || !password)
      return res.json({ message: "please fill all fields" });

    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const sql =
          "UPDATE users SET firstName= ?,lastName= ? , password= ? WHERE users.email = ?";
        db.query(sql, [firstName, lastName, hashedPassword, email], (err) => {
          if (err) return res.json({ message: "update went wrong" });
        });
      })
      .then(() => {
        req.session.firstName = firstName;
        req.session.lastName = lastName;
        res.redirect("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return res.json({ message: "please Login first" });
  }
});
module.exports = router;
