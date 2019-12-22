const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
  forum: [
    {
      type: Schema.Types.ObjectId,
      ref: "forum"
    }
  ],

  // user: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "user"
  //   }
  // ],

  title: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  content: {
    type: Object
  }
});

module.exports = Discussion = mongoose.model("discussion", DiscussionSchema);
