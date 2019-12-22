const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const Discussion = require("./Discussion");

// Create Schema
const ForumSchema = new Schema({
  title: {
    type: String
  },

  discussions: [
    {
      type: Schema.Types.ObjectId,
      ref: "discussion"
    }
  ]
});

ForumSchema.pre("remove", async function (next) {
  try {
    Promise.all([
      await Discussion.find({ _id: { $in: this.discussions } }).then(discussions => {
        discussions.forEach(discussion => {
          discussion.remove();
        });
      }),
      await Discussion.deleteMany({ _id: { $in: this.discussions } })
    ]);

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = Forum = mongoose.model("forum", ForumSchema);
