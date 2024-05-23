const mongoose = require('mongoose')

const URL = 'mongodb+srv://coderibrahimgazi:12345@pos-application.6rinifb.mongodb.net/POS-Application'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})