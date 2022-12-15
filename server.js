const bodyParser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./models/connect')
const morgan = require('morgan')
// const exphbs = require('express-handlebars')
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const MongoStore = require('connect-mongo');



// load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)


connectDB()

const app = express()

// logging
if (process.env.NODE_ENV === 'development') {
    // add the morgan middleware if we're in dev mode
    app.use(morgan('dev'))
}
// handelbars helpers
const { formatDate, truncate, stripTags, editIcon, select } = require('./helpers/hbs')
const { errorController } = require('./controllers/errorController')

// method-override
app.use(bodyParser.urlencoded())
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

// handlebars

app.set('views', './views');
app.engine('.hbs', engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select, 
    }, 
    defaultLayout: 'main', extname: '.hbs'
}))
app.set('view engine', '.hbs')


// Sessions

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true } 
    // won't work without https
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
    // this MongoStore is to keep session { using (connect-mongo)} info to keep user logged in and save session to mongo db :)
}))


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Body parser
/**
 * @description middleware to allow us to parse the body html and access forms and other elements 
 */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// static folder

app.use(express.static(path.join(__dirname, 'assets')))

// routes

app.use('/', require('./server/routes/index'))
app.use('/auth', require('./server/routes/auth'))
app.use('/stories', require('./server/routes/stories'))

// error handeling
app.use(errorController)

// process.env gives access to variables in that config 
PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`))