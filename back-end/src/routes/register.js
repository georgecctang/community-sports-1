const router = require("express").Router()

module.exports = db => {
  router.post("/register", (req, res) => {
    db.query(`
      INSERT INTO users (first_name, last_name, email, password, phone, age, gender) 
      VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::integer, $7::text)
      ON CONFLICT DO NOTHING;
      `
      , ['First', 'Last', 'email@gmail.com', 'Password', '6135561456', 18, 'Male' ]
    ) .then(() => {
        res.json('Updated')
      }) 
      .catch((err) => {
        console.log(err)
      })
    })

  return router;
}