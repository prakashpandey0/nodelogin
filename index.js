const express = require('express');

const app = express();
const passport = require('passport');


const user = require('./route/user');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());

//passport config
require('./passport')(passport);

app.use('/user',user);

app.listen(3000, () => console.log("server started at 3000"))
