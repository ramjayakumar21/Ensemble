if (process.env.NODE_ENV !== "production") {
    require('dotenv')
    .config({path:`${__dirname}/.env`})
}  

/* code for templates, currently not in use */
const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views_old')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const cors = require("cors")
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}))
app.use(bodyParser.json());
app.use(bodyParser.text());

const indexRouter = require("./routes/index")
const artistsRouter = require("./routes/artists")
const usersRouter = require('./routes/users')
const reviewsRouter = require('./routes/reviews')


const mongoose = require("mongoose")
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, {
    useNewURLParser: true
})
mongoose.set('strictQuery', false);
const db = mongoose.connection  
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
    

app.use('/', indexRouter)
app.use('/artists', artistsRouter)
app.use('/users', usersRouter)
app.use('/reviews', reviewsRouter)

app.listen(process.env.PORT || 3001, () => {
    console.log("listening now!")
})

