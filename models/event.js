const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  event: {
    String,
    enum: [
      "Baby shower",
      "Bachelor party",
      "Batism",
      "Birthday",
      "Retirement",
      "Wedding"
    ]
  },
  age: {
    String,
    enum: ["0-4", "5-11", "12-17", "18-35", "36-60", "61 and more"]
  },
  budget: {
    String,
    enum: [
      "10€-49€",
      "50€-99€",
      "100-149€",
      "150€-199€",
      "200€-500€",
      "500€-1000€",
      "1000€ and more"
    ]
  },
  interest: {
    String,
    enum: [
      "Adventure",
      "Arts and culture",
      "Cinema",
      "Do It Yourself",
      "Ecology",
      "Family life",
      "Musique",
      "Sports",
      "Thrills",
      "Unusual",
      "Wellbeing"
    ]
  }
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
