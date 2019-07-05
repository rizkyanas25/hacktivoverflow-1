if(!process.env.NODE_ENV || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test' ){
  require('dotenv').config()
}

const express = require("express")
const app = express()
const cors = require('cors')
const PORT = 3000
const route = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const axios = require("axios")
const http = require('http').Server(app)
const io = require("socket.io")(http)
const cron = require("node-cron")
const _ = require('underscore')


io.on("connection", socket => {
  console.log("new connection created..");
});

const getJob = cron.schedule("*/15 * * * * *", async () => {
  try {  
    let { data } = await axios.get(
      `https://jobs.github.com/positions.json?description=developer`
    );
    data = _.shuffle(data).slice(0, 10);
    io.emit("getJobs", data);
  } catch (error) {
    console.log(error);
  }
});

getJob.start();

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser : true}, function (err) {
  if (err) console.log('connection to db failed')
  else {
    console.log(`connection to db foxesflow success`)
  }
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)
app.use(errorHandler)

http.listen(PORT, ()=>{
  console.log(`listening to port: ${PORT}`);
})

module.exports = app