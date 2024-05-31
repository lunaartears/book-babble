const express = require('express')
const mongoose = require('mongoose')
const bookRouter = express.Router()
const Book = require('../models/book.js')

//get all books
bookRouter.get("/", async (req, res, next) => {
    try {
        const books = await Book.find()
        return res.status(200).send(books)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//get posts by user id
bookRouter.get("/user", async (req, res, next) => {
    try {
        const UserBooks = await Book.find({ user: req.auth._id })
        return res.status(200).send(UserBooks)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//add new book
bookRouter.post("/", async (req, res, next) => {
    try {
        req.body.user = req.auth._id

        const newBook = new Book(req.body)
        const savedBook = await newBook.save()
        return res.status(201).send(savedBook)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//delete book
bookRouter.delete("/:bookId", async (req, res, next) => {
    try {
        const deletedBook = await Book.findOneAndDelete(
            { _id: req.params.bookId, user: req.auth._id }   //the book id , the user who made it (so only the user who made it can update it)
        )
        return res.status(200).send(`Successfully deleted ${deletedBook.title} from the database`)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//update book
bookRouter.put("/:bookId", async (req, res, next) => {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { _id: req.params.bookId, user: req.auth._id },
            req.body,
            { new: true }
        )
        return res.status(201).send(updatedBook)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//like book
bookRouter.put('/like/:bookId', async (req, res, next) => {
    try {
        const updatedLike = await Book.findOneAndUpdate(
            { _id: req.params.bookId },
            {
                $addToSet: { likedUsers: req.auth._id },
                $pull: { dislikedUsers: req.auth._id }
            },
            { new: true }
        )

                return res.status(201).send(updatedLike)


        } catch (err) {
            res.status(500)
            return next(err)

}})

//dislike book
bookRouter.put('/dislike/:bookId', async (req, res, next) => {
    try {
const updatedDislike = await Book.findOneAndUpdate(
        { _id: req.params.bookId },
        {
            $addToSet: { dislikedUsers: req.auth._id },
            $pull: { likedUsers: req.auth._id }
        },
        { new: true }
)

            return res.status(201).send(updatedDislike)
    } catch (err) {
        res.status(500)
        return next(err)
    }

})


module.exports = bookRouter
