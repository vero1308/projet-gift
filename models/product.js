const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  image: {
    type: String,
    default:
      "https://s1.qwant.com/thumbr/0x0/3/c/47fe4a877a815796e4e74607d1d529b44437e34ba4882fdec70e94a8080d5c/noimage.gif?u=http%3A%2F%2Fmoorestown-mall.com%2Fnoimage.gif&q=0&b=1&p=0&a=1"
  },
  links: String,
  event: {
    type: [String],
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
    type: [String],
    enum: ["0-4", "5-11", "12-17", "18-35", "36-60", "61 and more"]
  },
  budget: {
    type: [String],
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

const product = mongoose.model("product", productSchema);

module.exports = product;
