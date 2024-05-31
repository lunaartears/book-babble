import React, {useContext} from 'react'
import {UserContext} from '../context/UserProvider.jsx'

export default function CommentForm(props) {
    const {comment, handleChange, handleSubmit} = useContext(UserContext)
    const {id} = props





    return (
        <form onSubmit={(e) => handleSubmit(e, id)}>
            <input
            className='comment-input'
            type='text'
            name='text'
            value={comment}
            placeholder='add a comment'
            onChange={handleChange}

            />
            <button className='submit-comment-btn'>Submit Comment</button>
        </form>


    )
}
