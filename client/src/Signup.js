import React, { useState, useContext } from 'react'
import { UserContext } from './context/user'
import { useNavigate, NavLink } from 'react-router-dom'

function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [errorsList, setErrorsList] = useState([])
    const {signup} = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("/signup", {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: passwordConfirm
            })
        })
        .then(res => res.json())
        .then(user => {
            if (!user.errors) {
                signup(user)
                navigate('/')
            } else {
                setUsername("")
                setPassword("")
                setPasswordConfirm("")

                const errorList = user.errors.map(e => <li>{e}</li>)
                setErrorsList(errorList)
            }
        })
    };

    return (
        <div>
            <h3 className='button'>Create Your !Twitter Account</h3>
            <form onSubmit={handleSubmit} className='button'>
            {/* <label>Username</label> */}
            <input
                placeholder='Username'
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br/>
            {/* <label>Password</label> */}
            <input
                placeholder='Password'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /> <br/>
              {/* <label>Password Confirmation</label> */}
            <input
                placeholder='Password Confirmation'
                type='password'
                id='password_confirm'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
            /> <br/>
            <input type='submit'/>
            </form>
            <ul>
                {errorsList}
            </ul>
            <NavLink to="/login">
            <p className='button'>Already have an account?</p>
            </NavLink>
        </div>
    );
}

export default Signup