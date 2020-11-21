const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors"); 
const morgan = require("morgan"); 
const app = express();
const cookieSession = require("cookie-session")

app.use(cookieSession({
  name: "session",
  keys: ["topsecret", "tiptopsecret"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


const db = require("./db");

const users = require("./routes/users"); 
const register = require("./routes/register");


module.exports = function application(
  ENV,
  actions = { updateAppointment: () => {} }
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use("/api", users(db));
  app.use("/api", register(db));

  app.close = function() {
    return db.end();
  };

  return app;
};
