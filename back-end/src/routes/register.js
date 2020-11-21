const router = require("express").Router()

module.exports = db => {
  router.get("/register", (req, res) => {
    //The on conflict is not working right now
    // `SELECT * FROM users WHERE email=$1`
    db.query(`
      INSERT INTO users (first_name, last_name, email, password, phone, age, gender) 
      VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::integer, $7::text)
      RETURNING id;
      `
      , ['First', 'Last', 'emadil@gmail.com', 'Password', '6135561456', 18, 'Male' ]
    ) .then((data) => { 
        const id = data.rows[0].id
        req.session.user_id = id //saves user as as cookie
        res.json('Updated')
      }) 
      .catch((err) => {
        console.log(err)
      })
    })
  return router;
}