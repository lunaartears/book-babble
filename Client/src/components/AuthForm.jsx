import React from 'react'

export default function AuthForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        authInputs: {
            username,
            password
        }
    } = props

    return (
        <form className="" onSubmit={handleSubmit}>
            <input
                type='text'
                value={username}
                name='username'
                placeholder='username'
                onChange={handleChange}
            />
            <input
                type='text'
                value={password}
                name='password'
                placeholder='password'
                onChange={handleChange}
            />
            <button>{btnText}</button>
            <p>{errMsg}</p>
        </form>
    )
}
