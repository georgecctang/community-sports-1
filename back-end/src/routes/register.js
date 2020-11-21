const router = require("express").Router()


module.exports = db => {
  router.post("/register", (req, res) => {
    const {first_name, last_name, email, password, phone, age, gender} = req.body
    db.query(`SELECT * FROM users WHERE email=$1`, 
    [email]) 
    .then((user) => {
      console.log(user.rows[0])
      //If user exists stop and send email already exists
      if (user.rows[0]) {
        return 'Email already in use'
        //if user email does not exist add to DB
      } else {
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
            //returning the whole user object 
            return data
         }) 
          .catch((err) => {
            console.log(err)
          })
        }
      })  
    })
  return router;
}