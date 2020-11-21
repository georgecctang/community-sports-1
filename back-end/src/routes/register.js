const router = require("express").Router()


module.exports = db => {
  router.post("/register", (req, res) => {
    const {first_name, last_name, email, password, phone, age, gender} = req.body
    console.log(req.body)
    console.log(first_name, last_name, email, password, phone, age, gender)
    //The on conflict is not working right now
    // `SELECT * FROM users WHERE email=$1`
    db.query(`
      INSERT INTO users (first_name, last_name, email, password, phone, age, gender) 
      VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::integer, $7::text)
      RETURNING id;
      `
      , [first_name, last_name, email, password, phone, age, gender ]
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