const router = require("express").Router();

// For the routes /events/...

module.exports = db => {
  
  // PUT: User to join event or update info (e.g change team and position) 

  router.post("/user/events/:event_id/create", (req, res) => {
    
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
    router.put("/user/events/:event_id/edit", (req, res) => {
    
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
  router.delete("/user/events/:event_id/delete", (req, res) => {
    
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

  return router;
};