const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User model
const User = require("../../models/User");

//***********************************************

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "ایمیل واردشده تکراری است.";
      return res.status(400).json({ errors });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ name: user.name, email: user.email }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//***********************************************

// @route   GET api/users/login
// @desc    Login User
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "کاربری با این ایمیل وجود ندارد.";
      return res.status(404).json({ errors });
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
        jwt.sign(payload, keys.secret, { expiresIn: "7d" }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "رمز عبور اشتباه است.";
        return res.status(400).json({ errors });
      }
    });
  });
});

// // @route   GET api/users/current
// // @desc    Return current user
// // @access  Private
// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

module.exports = router;
