const router = require("express").Router();

module.exports = db => {
  router.get("/messages/:user_id", (req, res) => { 
    console.log('GET messages');    
    const userId = req.params.user_id;


    db.query(`
    SELECT m.*, u1.first_name as sender_first_name, u1.last_name as sender_last_name,
    u2.first_name as recipient_first_name, u2.last_name as recipient_last_name
    FROM messages AS m
    JOIN users AS u1 ON m.sender_id = u1.id
    JOIN users AS u2 ON m.recipient_id = u2.id
    JOIN message_user as mu ON m.id = mu.message_id
    WHERE mu.user_id = $1`, 
    [userId]
  )
    .then((data) => {
      // console.log(data);
      res.send(data.rows);
    }) 
  })
  return router
}