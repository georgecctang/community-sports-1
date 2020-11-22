const router = require("express").Router();

// For the routes /events/...

module.exports = db => {
  
    // GET: All future events with the closest one on top
    router.get("/events", (req, res) => {
      const currentDate = new Date();

      db.query(
        `
        SELECT * FROM events
        WHERE date >= $1
        ORDER BY date
        ;
        `,
      [currentDate]).then(({rows}) => res.json(rows))
    })

    // GET: All past events with the most recent one on top
    router.get("/events/past", (req, res) => {
      const currentDate = new Date();

      db.query(
        `
        SELECT * FROM events
        WHERE date < $1
        ORDER BY date DESC
        ;
        `,
      [currentDate]).then(({rows}) => res.json(rows))
    })

    // GET: All event data and associated team data based on event id
    router.get("/events/:event_id", (req, res) => {

      db.query(
        `
        SELECT e.*, t.*, c.* FROM events AS e
        WHERE id = $1
        JOIN teams AS t ON t.event_id = e.id
        ;
        `,
      [eventId]).then(({rows}) => res.json(rows))
    })

  return router;
};
