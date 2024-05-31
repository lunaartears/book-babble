const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt: jwt} = require('express-jwt')
//const bcrypt = require('bcrypt')
const path = require("path")  //

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))  //

async function connectToDB() {
    try {
        mongoose.connect(
            'mongodb+srv://lunarlightandshadow:D0j6JeBxItkAtcSa@cluster0.vgrevnd.mongodb.net/'
        )
            console.log('Connected to the DB')
    } catch (err) {
        console.log(err)
    }
}

app.use('/auth', require("./routes/authRouter.js"))
app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/book', require('./routes/bookRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")); });  //

app.listen(7007, () => {
    console.log("Server is running on port 7007")
    connectToDB()
})
