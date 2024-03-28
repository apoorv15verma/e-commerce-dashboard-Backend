const mongoose = require('mongoose');



require('dotenv').config();

// const mongoURL=process.env.mongoURL;
const mongoURL=process.env.DBmongoURL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})



const db =mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongo server")
})

db.on('error',(err)=>{
    console.log("connection error",err)
})

db.on('disconnected',()=>{
    console.log("disconnected ")
})

module.exports=db;