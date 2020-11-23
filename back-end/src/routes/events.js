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
        ORDER BY date DESC
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
      const eventId = req.params
      db.query(
        `
        SELECT e.*, t.*, c.* FROM events AS e
        WHERE id = $1
        JOIN teams AS t ON t.event_id = e.id
        JOIN comments AS c ON c.event_id = e.id
        ;
        `,
      [eventId]).then(({rows}) => res.json(rows))
    })

  // PUT: User to join event or update info (e.g change team and position) 

  router.post("/events/:event_id", (req, res) => {
    
    const eventId = req.params.event_id;
    // const eventId = 100;/
    // need the user id from cookie
    // const userId = req.session.user_id;

    // Temp user ID for testing
    const userId = 20;
    
    // set an object named data from server
    const { teamNumber, position } = req.body;
    
    db.query(
      `
      INSERT INTO teams (event_id, user_id, team_number, position)
      VALUES ($1, $2, $3, $4)
      ;
    `,
     [eventId, userId, Number(teamNumber), position])
     .then(() => res.json({status: "post okay"}))
     .catch(error => console.log(error));

    });

    // PUT: user update settings
    router.put("/events/:event_id", (req, res) => {
    
      const eventId = req.params.event_id;
      // const eventId = 100;/
      // need the user id from cookie
      // const userId = req.session.user_id;
      
      // Temp user ID for testing
      const userId = 20;
      
      // set an object named data from server
      const { teamNumber, position } = req.body;
      
      db.query(
        `
        UPDATE teams SET team_number = $3, position = $4
        WHERE event_id = $1 AND user_id = $2;
      `,
       [eventId, userId, Number(teamNumber), position])
       .then(() => res.json({status: "put okay"}))
       .catch(error => console.log(error));
  
      });

  // DELETE: User to leave event
  router.delete("/events/:event_id", (req, res) => {
    
    const eventId = req.params.event_id;
    // need the user id from cookie
    const userId = req.params.user_id;
    
    db.query(
      `
      DELETE FROM teams
      WHERE event_id = $1 AND user_id = $2;
    `,
     [eventId, userId])
     .then(() => res.status(204).json({status: 'delete okay'}))
     .catch(error => console.log(error));
     
    });

  //Add a comment to an event page 
  router.post("/events/:event_id/comments", (req, res) => {
    const eventId = req.params.event_id 
    const {userId, comment} = req.body
    db.query(` 
    INSERT INTO comments (user_id, event_id, comment) 
    VALUES ($1::integer, $2::integer, $3::text)`
    , [userId, eventId, comment]
  ) 
  .then(() => res.send('Comment Added'))
  }) 

  return router;
};
