const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  },
  events: [{ type: Schema.Types.ObjectId, ref: "event" }]
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
