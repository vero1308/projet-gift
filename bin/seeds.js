require("dotenv").config();
const mongoose = require("mongoose");
const giftModel = require("./../models/product");
const gifts = require("./../database");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(dbRes => {
    console.log("Connected to Mongo!");
    giftModel
      .create(gifts)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
