const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors"); 
const morgan = require("morgan");

const app = express();

const db = require("./db");

const days = require("./routes/days"); 
const register = require("./routes/register");


module.exports = function application(
  ENV,
  actions = { updateAppointment: () => {} }
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use("/api", days(db));
  app.use("/api", register(db));

  app.close = function() {
    return db.end();
  };

  return app;
};
