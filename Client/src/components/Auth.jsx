import React, {useState, useContext} from 'react'
import AuthForm from './AuthForm.jsx'
import {UserContext} from '../context/UserProvider.jsx'

const initAuthInputs = {
    username: "",
    password: ""
}

export default function Auth() {
    const [authInputs, setAuthInputs] = useState(initAuthInputs)
    const [authToggle, setAuthToggle] = useState(false)

    const {errMsg, signup, login, resetAuthErr} = useContext(UserContext)



    function handleChange(e) {
        const {name, value} = e.target
        setAuthInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(authInputs)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(authInputs)
    }

    function toggleForm() {
        setAuthToggle(prev => !prev)
        resetAuthErr()
    }

    return (
        <div className='auth-form'>
            <h1>Welcome to Book Babble</h1>
            <h2>Log in or Sign up!</h2>
            {!authToggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        authInputs={authInputs}
                        btnText="Sign up"
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Log In</p>
                </>
                :
                <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    authInputs={authInputs}
                    btnText="Log in"
                    errMsg={errMsg}
                />
                <p onClick={toggleForm}>Sign up</p>
            </>
            }
        </div>
    )

}
