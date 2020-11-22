const router = require("express").Router(); 

module.exports = db => {
  router.post("/logout", (req, res) => {
    req.session.user_id = null 
    res.send("Logged Out")
  }) 
  return router
}