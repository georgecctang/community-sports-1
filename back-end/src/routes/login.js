const router = require("express").Router();

module.exports = db => {
  router.get("/login", (req, res) => {
    //Currently using hardcoded data from schema
    db.query(`
      SELECT id 
      FROM users 
      WHERE email= $1 AND password=$2
      `
    , ['apple13@gmail.com', 'pasdad'])
    .then((data) => {
      req.session.user_id = data.rows[0].id 
      res.json('Cookie Saved')
    })
  })
  return router;
}