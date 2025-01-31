const { default: mongoose } = require('mongoose');

// define user data schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// creating a data model from schema
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
