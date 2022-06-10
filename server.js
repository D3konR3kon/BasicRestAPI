require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://MrVdila:a8ghd459gl7@cluster0.kxal2.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())

const subscriberRoutes = require('./routes/subscribers')
app.use('/subscribers', subscriberRoutes)

app.listen(3000, () => console.log('Server has started'))