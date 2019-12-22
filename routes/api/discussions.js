const express = require("express");
const router = express.Router();
const passport = require("passport");

const Forum = require("../../models/Forum");
const Discussion = require("../../models/Discussion");

//***********************************************

// @route   GET api/discussions/forumId
// @desc    Get Forum discussions
// @access  Public
router.get("/:forumId", (req, res) => {
  const error = {};

  Forum.findOne({ _id: req.params.forumId })
    .then(forum => {
      if (!forum) {
        error.discussion = "این انجمن وجود ندارد.";
        return res.status(404).json({ error });
      }

      Forum.find({ _id: { $in: forum.discussions } })
        .then(discussions => {
          res.json(discussions);
        })
        .catch(err => res.json(err));
    })
    .catch(err => {
      if (err.name === "CastError" && err.path === "_id") {
        error.discussion = "انجمن موردنظر وجود ندارد.";
        res.status(404).json({ error });
      }
    });
});

//***********************************************

// @route   POST api/discussions/forumId
// @desc    Create a new Discussion
// @access  Private
router.post(
  "/:forumId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = {};

    // Check if forum _id is valid
    Forum.findOne({ _id: req.params.forumId })
      .then(forum => {
        if (!forum) {
          error.discussion = "این انجمن وجود ندارد.";
          return res.status(404).json({ error });
        }

        const discussionFields = {};
        discussionFields.forum = req.params.forumId;

        if (isEmpty(req.body.title)) {
          error.discussion = "لطفاً عنوان موضوع را وارد نمایید.";
          return res.status(400).json({ error });
        } else
          discussionFields.title = req.body.title;

        if (req.body.content) discussionFields.content = req.body.content;

        Discussion.findOne({ title: discussionFields.title })
          .then(discussion => {
            if (discussion) {
              error.discussion = "این موضوع گفتگو تکراری است.";
              return res.status(400).json({ error });
            }
            new Discussion(discussionFields).save().then(discussion => {
              // Add discussion to desired forum
              forum.discussions.push(discussion);
              forum.save();
              res.json(discussion);
            });
            // catch: ***** TODO *****
          })
          .catch(err => res.json(err));
      })

      .catch(err => {
        if (err.name === "CastError" && err.path === "_id") {
          error.discussion = "انجمن موردنظر وجود ندارد.";
          res.status(404).json({ error });
        }
      });
  }
);

//***********************************************

// @route   DELETE api/discussions/:discussionId
// @desc    Delete a discussion
// @access  Private
router.delete(
  "/:discussionId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = {};

    //findOneAndDelete****
    Discussion.findOne({ _id: req.params.discussionId })
      .then(discussion => {
        if (!discussion) {
          error.discussion = "موضوع گفتگوی موردنظر وجود ندارد.";
          return res.status(404).json({ error });
        }
        Forum.findOne({ _id: discussion.forum })
          .then(forum => {
            const removeIndex = forum.discussions.indexOf(
              req.params.discussionId
            );
            if (removeIndex > -1) {
              forum.discussions.splice(removeIndex);
              forum.save();
            }
          })
          .catch(err => res.json(err));
        Discussion.deleteOne({ _id: req.params.discussionId })
          .then(() => res.json({ success: true }))
          .catch(err => res.json(err));
      })
      .catch(err => {
        // Error handling: Check if discussion _id is valid
        if (err.name === "CastError" && err.path === "_id") {
          error.discussion = "موضوع گفتگوی موردنظر وجود ندارد.";
          res.status(404).json({ error });
        }
      });
  }
);

module.exports = router;
