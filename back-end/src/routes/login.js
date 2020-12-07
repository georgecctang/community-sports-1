const router = require("express").Router(); 
module.exports = db => {
  router.post("/login", (req, res) => { 
    const {email, password} = req.body;
    console.log("POST /login");
    db.query(`
      SELECT id, first_name, last_name 
      FROM users 
      WHERE email= $1 AND password=$2
      `
    , [email, password])
    .then(({rows}) => {
      if (rows.length !== 0) {
        req.session.user_id = rows[0].id;
        res.json(rows[0]); 
      } else {
        console.log("Incorrect login information");
        res.send("Incorrect login information");
      }
    })
  })
  return router;
}