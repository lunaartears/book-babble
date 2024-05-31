const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    read: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    releaseDate: {
        type: String,
    },
    format: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",                    // which collection (model) is this from
        required: true
    }
})


module.exports = mongoose.model("Book", bookSchema)
