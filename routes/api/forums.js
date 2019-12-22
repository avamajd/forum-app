const express = require("express");
const router = express.Router();

const Forum = require("../../models/Forum");

const isEmpty = require("../../validation/is-empty");

//***********************************************

// @route   GET api/forums/all
// @desc    Get All Forums
// @access  Public
router.get("/all", (req, res) => {
  const error = {};

  Forum.find()
    .then(forums => {
      if (!forums) {
        error.forum = "انجمنی وجود ندارد.";
        return res.status(404).json({ error });
      }
      res.json(forums);
    })
    .catch(err => res.status(404).json(err));
});

//***********************************************

// @route   POST api/forums/create
// @desc    Create forum
// @access  Public
router.post("/create", (req, res) => {
  let error = {};

  if (isEmpty(req.body.title)) {
    error.forum = "لطفاً یک عنوان برای انجمن انتخاب نمایید.";
    return res.status(400).json({ error });
  }

  Forum.findOne({ title: req.body.title }).then(forum => {
    if (forum) {
      error.forum = "انجمن موردنظر شما هم اکنون وجود دارد.";
      return res.status(400).json({ error });
    } else {
      const newForum = new Forum({ title: req.body.title });
      newForum
        .save()
        .then(forum => res.json(forum))
        .catch(err => console.log(err));
    }
  });
});

//***********************************************

// @route   DELETE api/forums/:forumId
// @desc    Delete forum and its associated discussions
// @access  Public
router.delete("/:forumId", (req, res) => {
  let error = {};

  Forum.findOneAndDelete({ _id: req.params.forumId })
    .then(forum => {
      if (!forum) {
        error.forum = "انجمن موردنظر وجود ندارد.";
        return res.status(404).json({ error });
      }
      // To trigger cascading remove (discussions)
      forum.remove();
      res.json({ success: true });
    })
    // Error handling
    .catch(err => {
      if (err.name === "CastError" && err.path === "_id") {
        error.forum = "انجمن موردنظر وجود ندارد.";
        return res.status(404).json({ error });
      }
    });
});

module.exports = router;
