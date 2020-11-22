const router = require("express").Router(); 

module.exports = db => {  
  router.post("/events/new", (req, res) => {
    const {owner_id , date, start_time, end_time, title,
      address, city, province, current_participants, max_participants, skill_level, 
      gender_restriction, referee, additional_info} = req.body 
      
      db.query(` 
      INSERT INTO events (owner_id , date, start_time, end_time, title,
        address, city, province, current_participants, max_participants, skill_level, 
        gender_restriction, referee, additional_info) 
        VALUES ($1::integer, $2::date, $3::time, $4::time, $5::text, $6::text, 
        $7::text, $8::text, $9::integer, $10::integer, $11::text, $12::text, $13::boolean, $14::text)
        RETURNING owner_id , date, start_time, end_time, title,
        address, city, province, current_participants, max_participants, skill_level, 
        gender_restriction, referee, additional_info;`
        , [owner_id, date, start_time, end_time, title, address, city, province, current_participants, 
        max_participants, skill_level, gender_restriction, referee, additional_info]
        ) .then(() => {
          //When it saved
          res.send('Successfully Created')
        }) 
        //When it fails
        .catch((err) => {
          console.log(err)
          res.send('Error')
        })
  }) 

  router.delete("/events/:id/delete", (req, res) => {
    const id = req.params.id 
    db.query(` 
    DELETE FROM events 
    WHERE id=$1` 
    , [id]
    ) .then(() => {
      //When it is Deleted
      res.send('Successfully Deleted')
    }) 
  })
  return router
}