const router = require("express").Router()


module.exports = db => {

  router.get("/login", (req, res) => {
    console.log('request received from front end');

    res.send('get register okay');
  })
  return router;
}