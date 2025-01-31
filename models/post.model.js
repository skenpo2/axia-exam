const { default: mongoose } = require('mongoose');

// define  post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
// creating a data model from schema
const postModel = mongoose.model('post', postSchema);
module.exports = postModel;
