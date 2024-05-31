import React, {useContext} from "react";
import {UserContext} from '../context/UserProvider'

export default function Comment(props) {

    //const {comment} = useContext(UserContext)
    const {text} = props


    return (
        <p>{text}</p>
    )
}
