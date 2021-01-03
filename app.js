const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(loginRoutes);
app.use(registerRoutes);
app.use(cookieParser());


app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
