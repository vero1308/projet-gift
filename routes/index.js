const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();

const product = require("./../models/product");
const database = require("../database.js");
// const signin = require("../views/auth/signin");

router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/", (req, res, next) => {
//   res.render("/partials/gift_nav");
// });

// router.get("/", (req, res, next) => {
//   res.render("/auth/signin");
// });

// Connection to the database "giftIt"
mongoose
  .connect("mongodb://localhost/giftIt", { useNewUrlParser: true })
  .then(dbResult => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });





module.exports = router;
