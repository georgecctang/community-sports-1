const router = require("express").Router();

module.exports = db => {
  router.get("/checkdb/users", (request, response) => {
    db.query(
      `
      SELECT * FROM users;
      
    `
    ).then(({ rows: users }) => {
      response.json(users);
    });
  });
  router.get ("/test", (req, res) => {
    res.json('It works')
  }) 
  router.get("/checkdb/events", (request, response) => {
    db.query(
      `
      SELECT * FROM events;
      
    `
    ).then(({ rows: events }) => {
      response.json(events);
    });
  });

  return router;
};
