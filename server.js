const express = require('express')
const dotenv = require('dotenv') // very usful when you're working with collabrative enviroment ( so )
const morgan = require('morgan') // allows us to log a request to the console whenever u make a request
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')


const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log requests `prints req in the console`
app.use(morgan("tiny"))

// mongoDB connection

connectDB()

// parse req to body-parser
app.use(bodyparser.urlencoded({ extended:true }))

// set view engine 
app.set("view engine","ejs") // bydefault it will go to the views 
// app.set('views',path.resolve(__dirname,'views/HTML')) // the project directory name and the view engine as views folder -- if you add any subfolders to the views folder you will have to specify the path and set the view engine as well 

// load assets 
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
// this will make your life easier if you want to use a style.css file for example you will have to write css/style.css and that's it ! 
// for example if i have images or js helpers:
app.use('/images',express.static(path.resolve(__dirname,'assets/images')))  
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

// routes 
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`running on http://localhost:${PORT}`) // console.log on server side prints in the servers console! unlike the frontend browser
})


