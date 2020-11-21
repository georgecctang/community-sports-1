const router = require("express").Router();

// For the routes /events/...

module.exports = db => {
  // PUT: User to join event or update info (e.g change team and position) 

  router.get("/events", (req, res) => {
    res.json({status: 'get okay'});
  })


  router.post("/events/:event_id", (req, res) => {
    
    const eventId = req.params.event_id;
    // const eventId = 100;/
    // need the user id from cookie
    // const userId = req.session.user_id;
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
     .then(() => res.json({status: "put okay"}))
     .catch(error => console.log(error));

    });

    // PUT: user update settings
    router.put("/events/:event_id", (req, res) => {
    
      const eventId = req.params.event_id;
      // const eventId = 100;/
      // need the user id from cookie
      // const userId = req.session.user_id;
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
     .then(() => res.status(204).json())
     .catch(error => console.log(error));
     
    });

  return router;
};

    // db.query(
    //   `
    //   INSERT INTO interviews (student, interviewer_id, appointment_id) VALUES ($1::text, $2::integer, $3::integer)
    //   ON CONFLICT (appointment_id) DO
    //   UPDATE SET student = $1::text, interviewer_id = $2::integer
    // `,
    //   [student, interviewer, Number(request.params.id)]
    // )
