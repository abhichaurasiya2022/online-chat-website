const express = require('express');
const router = express.Router();



  router.get("/join", (req,res) =>{
    return res.send("join");
  });



  module.exports = router;
