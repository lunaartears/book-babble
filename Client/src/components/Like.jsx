import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'

export default function Like(props) {


    const {likeBook, dislikeBook} = useContext(UserContext)
    const {likeCount, dislikeCount} = props

    function like() {
        likeBook(props.id)
    }

    return (
        <div>
            <button className='like-btn' onClick={() => likeBook(props.id)}>Like</button> <p>{likeCount}</p>
            <button className='dislike-btn' onClick={() => dislikeBook(props.id)}>Dislike</button> <p>{dislikeCount}</p>

        </div>
    )
}
