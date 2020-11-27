const router = require("express").Router(); 
const axios = require("axios") 
require('dotenv').config()

module.exports = db => {  
  router.post("/owners/events/new", (req, res) => {
    const {owner_id , date, start_time, end_time, title,
      address, city, province, max_participants, skill_level, 
      gender_restriction, referee, additional_info} = req.body  

      let location 
      //Formatting variables for api request
      const geocodeAddress = address.replace(/\s/g, '+') 
      const geocodeCity = city.replace(/\s/g, '+') 
      //Retriving lat and long from google api
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocodeAddress},+${geocodeCity},+CA&key=${process.env.geocodeKey}`)
      .then((res) => {
        const lat = res.data.results[0].geometry.location.lat
        const long = res.data.results[0].geometry.location.lng
        //Creating (x,y) format needed for psql point data type in psql
        location = `(${lat}, ${long})` 
      })
      .then(() => {
        //Making a new event
        db.query(` 
        INSERT INTO events (owner_id , date, start_time, end_time, title,
          address, city, province,  max_participants, skill_level, 
          gender_restriction, referee, additional_info, location) 
          VALUES ($1::integer, $2::date, $3::time, $4::time, $5::text, $6::text, 
          $7::text, $8::text, $9::integer, $10::text, $11::text, $12::boolean, $13::text, $14::point)
          RETURNING id;
          `
          , [owner_id, date, start_time, end_time, title, address, city, province,  
          max_participants, skill_level, gender_restriction, referee, additional_info, location]
        )

        // Are we using this? 
        // RETURNING owner_id , date, start_time, end_time, title,
        // address, city, province, max_participants, skill_level, 
        // gender_restriction, referee, additional_info;

      })
      .then((data) => {
        //When it saved
        res.send(data)
      })
      //When it fails
      .catch((err) => {
        console.log(err)
        res.send('Error')
      })
  // })

  // router.put("/owners/events/:id/edit", (req, res) => {
  //   const {owner_id , date, start_time, end_time, title,
  //     address, city, province, current_participants, max_participants, skill_level, 
  //     gender_restriction, referee, additional_info} = req.body  

  //     let location;
  //     //Formatting variables for api request
  //     const geocodeAddress = address.replace(/\s/g, '+') 
  //     const geocodeCity = city.replace(/\s/g, '+') 
  //     //Retriving lat and long from google api
  //     axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocodeAddress},+${geocodeCity},+CA&key=${process.env.geocodeKey}`)
  //     .then((res) => {
  //       const lat = res.data.results[0].geometry.location.lat
  //       const long = res.data.results[0].geometry.location.lng
  //       //Creating (x,y) format needed for psql point data type in psql
  //       location = `(${lat}, ${long})` 
  //     })
  //     .then(() => {
  //       //Making a new event
  //       db.query(` 
  //       UPDATE events 
  //       SET owner_id = $1::integer, 
  //       date = $2::date, 
  //       start_time = $3::time,, 
  //       end_time = $4::time,         
  //       title = $5::text,
  //       address = $6::text, 
  //       city = $7::text, 
  //       province = $8::text, current_participants, max_participants, skill_level, 
  //         gender_restriction, referee, additional_info, location) 
  //         VALUES (      
  //         $9::integer, $10::integer, $11::text, $12::text, $13::boolean, $14::text, $15::point)
  //         RETURNING owner_id , date, start_time, end_time, title,
  //         address, city, province, current_participants, max_participants, skill_level, 
  //         gender_restriction, referee, additional_info;`
  //         , [owner_id, date, start_time, end_time, title, address, city, province, current_participants, 
  //         max_participants, skill_level, gender_restriction, referee, additional_info, location]
  //       ) 
  //     })
  //     .then(() => {
  //       //When it saved
  //       res.send('Successfully Created')
  //     })
  //     //When it fails
  //     .catch((err) => {
  //       console.log(err)
  //       res.send('Error')
  //     })




  })

  /* 
    EventsIndex Page
    GET /events (we don't need the current participant column)
    + the number of current participants for each event (count(*) groupby event_id from the team table)
  
  
    */


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