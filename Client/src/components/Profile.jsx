import React, {useContext, useEffect} from 'react'
import BookForm from './BookForm.jsx'
import BookList from './BookList.jsx'
import {UserContext} from '../context/UserProvider.jsx'



export default function Profile() {
    const {
        user: {
            username
        },
        addBook,
        books,
        getUserBooks
    } = useContext(UserContext)

    useEffect(() => {
        getUserBooks()
    }, [])

    return (
        <div className='profile-book-list'>
            <h1 className='hello-text'>Hello *{username}*</h1>
            <h2 className='add-book-text'>Add a book to your library</h2>
            <BookForm btnText={"Add Book"} submit={addBook}/>
            <h2>Your Books</h2>
            <BookList books={books}/>
        </div>
    )
}
