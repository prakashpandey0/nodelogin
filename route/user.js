const express = require('express');
const router  = express.Router();
const conn = require('../config/conn');
const jwt      = require('jsonwebtoken');
const passport = require('passport');

conn.connect( (err) => console.log("connection error:",err));




router.get('/', (req, res) => {
  res.send("Welcome to user route");
})

router.post('/login', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  conn.query("select * from `users` where `name` = ?", [username], (error, results, fields) => {
    if(error){
      console.log(error)
      return res.status(404).json({errors: 'Name not exits'});
    }else{
      const data = JSON.parse(JSON.stringify(results));
      console.log(data)
      const payload = {name: data[0].name}
      jwt.sign(payload,'node',{expiresIn: 3000},(err, token)=>{
                                                res.json({
                                                  success: true,
                                                  token: 'Bearer ' + token
                                                })
      })
    }

  })
})


router.get('/profile', passport.authenticate('jwt',{session: false}), (req, res) => {
  res.json(req.user)
})

module.exports = router
