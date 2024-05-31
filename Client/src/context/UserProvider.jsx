import React, { useState } from 'react'
import axios from 'axios'

const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initUserState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") ||  "",
        books: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initUserState)
    const [bookState, setBookState] = useState([])
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState({
        text: '',
        user: '',
        book: ''
    })
    const [likeCount, setLikeCount] = useState(0)
    const [dislikeCount, setDislikeCount] = useState(0)

    function signup(creds) {
        userAxios.post("auth/signup", creds)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(creds) {
        userAxios.post("auth/login", creds)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            books: []
        })
    }

    function handleAuthErr() {
        setUserState(prev => ({
            ...prev,
            errMsg: ""
        }))
    }

    function resetAuthErr() {
        setUserState(prev => ({
            ...prev,
            errMsg: ""
        }))
    }

    function getUserBooks() {
        userAxios.get("/api/book/user")
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    books: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllBooks() {
        userAxios.get("/api/book")
            .then(res => {
                setBookState(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addBook(newBook) {
        userAxios.post("/api/book", newBook)
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    books: [...prev.books, res.data]
                }))
                setBookState(prevBookState => [...prevBookState, res.data])
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteBook(bookId) {
        userAxios.delete(`/api/book/${bookId}`)
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    books: prev.books.filter(book => book._id !== bookId)
                }))
                setBookState(prevBookState => prevBookState.filter(book => book._id !== bookId))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function editBook(updates, bookId) {
        userAxios.put(`/api/book/${bookId}`, updates)
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    books: prev.books.map(book => book._id !== bookId ? book : res.data)
                }))
                setBookState(prevBookState => prevBookState.map(book => book._id !== bookId ? book : res.data))
            })
            .then (res => console.log(res.data))
            .catch(err => console.log(err.response.errMsg))  //data
    }
        console.log(bookState)

    // function editBook(bookId, updates) {
    //     userAxios.put(`/api/book${bookId}`, updates)
    //     .then(res =>
    //         setUserState(prevState =>
    //             prevState.map(book => book._id !== bookId ? book : res.data)))
    //     .catch(err => console.log(err.response.data.errMsg))
    // }


    function likeBook(bookId) {
        userAxios.put(`api/book/like/${bookId}`)
            .then(res => {
                setBookState(prev => prev.map(book => bookId !== book._id ? book : res.data))
                setUserState(prevUserState => ({
                    ...prevUserState, books: prevUserState.books.map(book => bookId !== book._id ? book : res.data)
                }))
                setLikeCount(+1)
            })
            .catch(err => console.log(err))
    }

    function dislikeBook(bookId) {
        userAxios.put(`api/book/dislike/${bookId}`)
            .then(res => {
                setBookState(prev => prev.map(book => bookId !== book._id ? book : res.data))
                setUserState(prevUserState => ({
                    ...prevUserState, books: prevUserState.books.map(book => bookId !== book._id ? book : res.data)
                }))
                setDislikeCount(+1)
            })
            .catch(err => console.log(err))
    }

    function getAllComments() {
        userAxios.get('/api/comment')
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function postNewComment(newComment, bookId) {
        userAxios.post(`api/comment/${bookId}`, newComment)
            .then(res => {
                setComments(prev => [...prev, res.data])
            })
            .catch(err => console.log(err))
    }

    function handleChange(e) {
        const {name, value} = e.target
        setCommentInput(prev => ({
            ...prev, [name]: value
        }))
    }

    function handleSubmit(e, id) {
        e.preventDefault()
        postNewComment(commentInput, id)
        setCommentInput({
            text: '',
            user: '',
            book: id
        })
    }



    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                handleAuthErr,
                resetAuthErr,
                getUserBooks,
                getAllBooks,
                addBook,
                deleteBook,
                editBook,
                bookState,
                likeBook,
                dislikeBook,
                getAllComments,
                postNewComment,
                handleChange,
                handleSubmit,
                comments
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }
