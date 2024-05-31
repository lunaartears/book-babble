import React from 'react'
import Book from './Book.jsx'

export default function BookList(props) {
    const {books} = props
    return (
        <div>
            {books.map(book => <Book {...book} key={book._id}/>)}
        </div>
    )
}
