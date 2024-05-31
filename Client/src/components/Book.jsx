import React, {useContext, useState} from 'react'
import Like from './Like.jsx'
import BookForm from './BookForm.jsx'
import {UserContext} from '../context/UserProvider'
import CommentList from './CommentList.jsx'
import CommentForm from './CommentForm.jsx'


export default function Book(props) {

    const { _id, user, title, author, genre, read, imgUrl, releaseDate, format, likedUsers, dislikedUsers } = props
    const {comments, editBook, deleteBook, user: loggedInUser} = useContext(UserContext)
    const [editToggle, setEditToggle] = useState(false)

    const filteredComments = comments.filter(comment => comment.book === _id )

    function handleEdit(inputs, id) {
        editBook(inputs, id)
        setEditToggle(prev => !prev)
    }

    return (
        <div className='book-list'>
            { !editToggle ?
                <>
                <img className='img' src={imgUrl}/>
                <h1>{title}</h1>
                <h3>Author: {author}</h3>
                <h3>Genre: {genre}</h3>
                <h3>Read this book: {read}</h3>
                <h3>Release Date: {releaseDate}</h3>
                <h3>Book Format: {format}</h3>

                <Like id={_id}/>
                <CommentForm id={_id}/>
            { user === loggedInUser._id && <>
            <button className='delete-book-btn' onClick={() => deleteBook(_id)}>Delete Book</button>
            <button className='edit-book-btn' onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit Book</button>
            </>}
            <CommentList filteredComments={filteredComments}/>
            </>
            :
            <>
                <BookForm
                    title={title}
                    author={author}
                    genre={genre}
                    read={read}
                    imgUrl={imgUrl}
                    releaseDate={releaseDate}
                    format={format}
                    _id= {_id}
                    submit={handleEdit}
                    btnText="Submit Edit"
            />
            <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Close Edit</button>
            </>

            }

        </div>
    )
}

                // <h3> Likes: {likedUsers.length}</h3>
                // <h3> Dislikes: {dislikedUsers.length}</h3>
