const express = require('express')
const connectDb= require('./config/db')
const dotenv=require('dotenv');
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const cors=require('cors')
dotenv.config();
const app = express()
connectDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = 5174
app.use('/auth',require('./routes/auth'))
app.use('/api/logfile',require('./routes/logupload'))
app.get('/', (req, res) => {
  res.send('Hello Worldasdasd!')
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
