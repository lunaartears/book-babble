import React, {useState} from 'react'
import { UserContext } from '../context/UserProvider.jsx'

export default function BookForm(props) {
    const { btnText, title, author, genre, read, imgUrl, releaseDate, format, _id, submit} = props

    const initBookInputs = {
        title: title || "",
        author: author || "",
        genre: genre || "",
        read: read || "",
        imgUrl: imgUrl || "",
        releaseDate: releaseDate || "",
        format: format || ""
    }

    const [bookInputs, setBookInputs] = useState(initBookInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setBookInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await submit(bookInputs, _id)
        setBookInputs(initBookInputs)
    }

    return (
        <form  className='book-form' onSubmit={handleSubmit}>
            <input
                className='book-form-input'
                type='text'
                name='title'
                value={bookInputs.title}
                onChange={handleChange}
                placeholder='Title'
            />
            <input
                className='book-form-input'
                type='text'
                name='author'
                value={bookInputs.author}
                onChange={handleChange}
                placeholder='Author'
            />
            <input
                className='book-form-input'
                type='text'
                name='genre'
                value={bookInputs.genre}
                onChange={handleChange}
                placeholder='Genre'
            />
            <input
                className='book-form-input'
                type='text'
                name='read'
                value={bookInputs.read}
                onChange={handleChange}
                placeholder='Read?'
            />
            <input
                className='book-form-input'
                type='text'
                name='imgUrl'
                value={bookInputs.imgUrl}
                onChange={handleChange}
                placeholder='Image Url'
            />
            <input
                className='book-form-input'
                type='text'
                name='releaseDate'
                value={bookInputs.releaseDate}
                onChange={handleChange}
                placeholder='Release Date'
            />
            <input
                className='book-form-input'
                type='text'
                name='format'
                value={bookInputs.format}
                onChange={handleChange}
                placeholder='Book Format'
            />
            <button>{btnText}</button>
        </form>
    )

}
