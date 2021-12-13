const express = require('express') 
const app = express();
const cors = require("cors")
const mongoose = require('mongoose');
const PORT = 2022
const cookieParser = require('cookie-parser');
const regiserRotes= require('./routes/register');
const loginRoutes= require('./routes/login');
const dashBoardRoute= require('./routes/dashboard');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
  });  

mongoose.connect('mongodb://localhost:27017/auth')

app.use('/api',regiserRotes);
app.use('/api', loginRoutes);
app.use('/api',dashBoardRoute);

app.get('/createCookie', (req, res)=> {
  res.cookie('token','surya is don' )
  res.json({
    message: "cookie set"
  })
})



app.listen(PORT, ()=>{
    console.log("connected to server on 2022");
})
