const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose');
const Issue  = require('./models/issue')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');

const options = {
    server: {sslCA: cert}};
// const connstring = "mongodb://localhost:27017/Grocery";
//const connstring = "mongodb+srv://Stephan:1234566@cluster0.uh5gqbo.mongodb.net/?retryWrites=true&w=majority"

const connstring = "mongodb+srv://Stephan1:1234566@cluster0.gitqugs.mongodb.net/?retryWrites=true&w=majority"

const issueRoutes = require("./routes/issue")
const userRoutes = require("./routes/user")

mongoose.connect(connstring)
.then(() => {
    console.log('Connected :-)')
})
.catch(()=>{
 console.log('NOT CONNECTED :-(')
}, options);

app.use(express.json())

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
})

app.get(urlprefix+'/',(req, res) =>{
res.send('hello world')
})

app.use(urlprefix+'/issues',issueRoutes)
app.use(urlprefix+'/users',userRoutes)

module.exports = app;