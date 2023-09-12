const mongoose = require("mongoose")


function connectDB(){
    mongoose.connect('mongodb://usama:123@ac-uvwsahn-shard-00-00.jeoz3jj.mongodb.net:27017,ac-uvwsahn-shard-00-01.jeoz3jj.mongodb.net:27017,ac-uvwsahn-shard-00-02.jeoz3jj.mongodb.net:27017/?ssl=true&replicaSet=atlas-4gj20b-shard-0&authSource=admin&retryWrites=true&w=majority')

const connection = mongoose.connection
connection.on('connected', ()=>{
    console.log("MongoDB connection successful")
})

connection.on('error', ()=>{
    console.log("MongoDB connection error")
})
}


connectDB()
module.exports = mongoose