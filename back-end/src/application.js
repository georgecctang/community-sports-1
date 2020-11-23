const fs = require("fs");
const path = require("path");
const db = require("./db");
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors"); 
const app = express();
const cookieSession = require("cookie-session")

app.use(cookieSession({
  name: "session",
  keys: ["topsecret", "tiptopsecret"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

const checkdb = require("./routes/checkdb"); 
const register = require("./routes/register");
const login = require("./routes/login");
<<<<<<< HEAD
const logout = require("./routes/logout");
const events = require("./routes/events");
const owners = require("./routes/owners");
const users = require("./routes/users");
=======
const events = require("./routes/events");
const owners = require("./routes/owners");
const users = require("./routes/users");
const logout = require("./routes/logout"); 
const cookies = require("./routes/cookies")
>>>>>>> origin

module.exports = function application(
  ENV,
  actions = { updateAppointment: () => {} }
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use("/api", checkdb(db));
  app.use("/api", register(db)); 
  app.use("/api", login(db));
  app.use("/api", logout(db));
  app.use("/api", events(db));
  app.use("/api", owners(db));
  app.use("/api", users(db));
<<<<<<< HEAD
=======
  app.use("/api", cookies(db))
>>>>>>> origin

  app.close = function() {
    return db.end();
  };

  return app;
};
