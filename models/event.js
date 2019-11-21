const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uploader = require("./../config/cloudinary");

const eventSchema = new Schema({
  name: String,
  type: {
    type: String,
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
    type: String,
    enum: ["0-4", "5-11", "12-17", "18-35", "36-60", "61 and more"]
  },
  budget: {
    type: String,
    enum: [
      "10€-49€",
      "50€-99€",
      "100€-149€",
      "150€-199€",
      "200€-500€",
      "500€-1000€",
      "1000€ and more"
    ]
  },
  interest: {
    type: [String],
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dfnnpxhx9/image/upload/v1574346940/gift/no-image-800x511_ry0fve.png"
    },
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
  },
  proposals: [{ type: Schema.Types.ObjectId, ref: "product" }]
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
