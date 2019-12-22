const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const forums = require("./routes/api/forums");
const discussions = require("./routes/api/discussions");

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

if (app.get('env') === 'development') {
  console.log('Enabling CORS');
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/forums", forums);
app.use("/api/discussions", discussions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
