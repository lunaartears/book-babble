const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

//signup
authRouter.post('/signup', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            res.status(403)
            return next(new Error("That username is taken"))
        } else {
            const newUser = User(req.body)
            const savedUser = await newUser.save()
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser.withoutPassword() })
        }
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//login
authRouter.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(403)
            return next(new Error("Username or password are incorrect"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                return next(new Error("Username or password are incorrect"))
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error("Username or password are incorrect"))
            }
            //const foundUser = User.findOne({username: req.body.username})
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })

        })


    } catch (err) {
        res.status(500)
        return next(err)
    }
})


module.exports = authRouter


// user.checkPassword(req.body.password, (err, isMatch) => {
//     if (err) {
//         res.status(403)
//         return next(new Error("Username or password are incorrect"))
//     }
//     const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
//     return res.status(200).send({ token, user: user.withoutPassword() })
// })


// if (req.body.password !== user.password) {
//     res.status(403)
//     return next(new Error("Username or password are incorrect"))
// }
// const token = jwt.sign(user.toObject(), process.env.SECRET)
// return res.status(200).send({ token, user })
