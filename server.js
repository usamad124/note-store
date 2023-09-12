const express = require("express")
const app = express()
const dbConnection = require('./db')
const uRoute =  require("./routes/Route");
const port = process.env.PORT || 5000 ;
const cors = require("cors")


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(uRoute);
app.get('/', (req, res)=>res.send('Hello World'))
app.listen(port,()=> console.log(`Node JS Server running on port ${port}`))