// initial config
require("dotenv").config(); // import all key/value pairs from .env in process.env : really usefull when going online :)
require("./config/mongo"); // database connection setup

// dependencies injection

const express = require("express");
const server = express();
const hbs = require("hbs");
const path = require("path");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
server.use(express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// SESSION SETUP
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);
server.use(flash());

// every time the server is called through HTTP ...
// this exposeFlashMessage callback will be executed ....
server.use(function exposeFlashMessage(req, res, next) {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

//------------------------------------------
// Login
// ------------------------------------------
server.use(function checkLoggedIn(req, res, next) {
  //console.log(req.session.currentUser);
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  res.locals.isAdmin = Boolean(
    req.session.currentUser && req.session.currentUser.role === "admin"
  );
  next();
});

const indexRouter = require(`./routes/index`);
server.use(`/`, indexRouter);
const authRouter = require(`./routes/auth`);
server.use("/auth", authRouter);
const eventRouter = require(`./routes/event`);
server.use(eventRouter);

// module.exports = server;
server.listen(process.env.PORT);
