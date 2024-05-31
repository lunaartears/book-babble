import React, { useContext, useEffect } from 'react'
import BookList from './BookList.jsx'
import { UserContext } from '../context/UserProvider.jsx'

export default function Public() {
    const {
            getAllBooks,
            bookState,
            user: {
                username
            }

    } = useContext(UserContext)

    useEffect(() => {
        getAllBooks()
    }, []);

    return (
        <div className='public-book-list'>
            <h2 className='commenting-as-text'>Commenting as *{username}*</h2>
            <h1 className='all-books-text'>All Books</h1>
            <BookList books={bookState}/>
        </div>
    )
}
