const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true // ✅ fixed
  }
});

UserSchema.plugin(passportLocalMongoose); // ✅ required for passport-local

module.exports = mongoose.model("User", UserSchema);


