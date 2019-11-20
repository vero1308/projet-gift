const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const cloudinary = require("./../config/cloudinary");

const product = require("./../models/product");
const database = require("../database.js");
const eventModel = require("./../models/event");
const userModel = require("./../models/user");
const productModel = require("./../models/product");

// router.get("/create-event", (req, res) => {
//   eventModel.find().then(dbRes => {
//     res.render("event", { giftIt: dbRes, css: ["event"] });
//   });
// });

//create event
router.get("/create-event", (req, res) => {
  res.render("event");
});

router.post("/create-event", (req, res) => {
  const newEvent = {
    name: req.body.name,
    type: req.body.type,
    image: req.body.image,
    age: req.body.age,
    budget: req.body.budget,
    interest: req.body.interest
  };
  //   if (req.file) newEvent.image = req.file.secure_url;
  productModel
    .find({
      $and: [
        { event: { $in: [newEvent.type] } },
        { age: { $in: [newEvent.age] } },
        { budget: { $in: [newEvent.budget] } },
        { interest: { $in: newEvent.interest } }
      ]
    })
    .then(proposals => {
      console.log(proposals);
      newEvent.proposals = proposals;
      eventModel
        .create(newEvent)
        .then(response => {
          console.log("session", req.session.currentUser);
          userModel
            .findByIdAndUpdate(req.session.currentUser._id, {
              $push: { events: response.id }
            })
            .then(dbRes => {
              req.flash("success", "event successfully created");
              // res.render("events");
              res.redirect("/events");
            })
            .catch(error => console.log(error));
        })
        .catch(dbErr => console.error(dbErr));
    })
    .catch(err => console.log(err));
});

router.get("/events", (req, res) => {
  userModel
    .findOne({ _id: req.session.currentUser._id })
    .populate("events")
    .then(dbRes => {
      console.log("proot", dbRes);
      res.render("events", {
        events: dbRes.events,
        css: ["event"]
      });
    });
});

//show proposals
router.get("/event/:id", (req, res) => {
  eventModel
    .findById(req.params.id)
    .populate("proposals")
    .then(dbRes => {
      console.log(dbRes);
      res.render("proposals", {
        events: dbRes,
        css: ["event"]
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
