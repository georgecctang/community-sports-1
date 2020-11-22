const router = require("express").Router(); 
const axios = require("axios")

module.exports = db => {  
  router.post("/owners/events/new", (req, res) => {
    const {owner_id , date, start_time, end_time, title,
      address, city, province, current_participants, max_participants, skill_level, 
      gender_restriction, referee, additional_info} = req.body  

      let location 
       
      const geocodeAddress = address.replace(/\s/g, '+') 
      const geocodeCity = city.replace(/\s/g, '+') 
      //Retriving lat and long from google api
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocodeAddress},+${geocodeCity},+CA&key=AIzaSyCiH--m_9xGKiwCJxv9nIgg1PYanFgTNL8`)
      .then((res) => {
        const lat = res.data.results[0].geometry.location.lat
        const long = res.data.results[0].geometry.location.lng
        location = `(${lat}, ${long})` 
      })
      .then(() => console.log(location)) 
      .then(() => {
        db.query(` 
        INSERT INTO events (owner_id , date, start_time, end_time, title,
          address, city, province, current_participants, max_participants, skill_level, 
          gender_restriction, referee, additional_info, location) 
          VALUES ($1::integer, $2::date, $3::time, $4::time, $5::text, $6::text, 
          $7::text, $8::text, $9::integer, $10::integer, $11::text, $12::text, $13::boolean, $14::text, $15::point)
          RETURNING owner_id , date, start_time, end_time, title,
          address, city, province, current_participants, max_participants, skill_level, 
          gender_restriction, referee, additional_info;`
          , [owner_id, date, start_time, end_time, title, address, city, province, current_participants, 
          max_participants, skill_level, gender_restriction, referee, additional_info, location]
        ) 
      })
      .then(() => {
        //When it saved
        res.send('Successfully Created')
      })
      //When it fails
      .catch((err) => {
        console.log(err)
        res.send('Error')
      })
  }) 

  router.delete("/owners/events/:id/delete", (req, res) => {
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
