const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'   // ref to the user who posted the comment
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'  // ref to the post the comment is related
    }
})

module.exports = mongoose.model('Comment', CommentSchema)
