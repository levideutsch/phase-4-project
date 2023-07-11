import React, { useState, useContext } from 'react'
import { UserContext } from './context/user'
import { useNavigate, NavLink } from 'react-router-dom'

function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [errorsList, setErrorsList] = useState([])
    const { signup, error, setError } = useContext(UserContext)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        return signup(username, password, passwordConfirm)
        // .then(() =>  navigate('/'))
    }

    return (
        <div>
            <h3 className='button'>Create Your !Twitter Account</h3>
            <form onSubmit={handleSubmit} className='button'>
            <input
                placeholder='Username'
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br/>
            <input
                placeholder='Password'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /> <br/>
            <input
                placeholder='Password Confirmation'
                type='password'
                id='password_confirm'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
            /> <br/>
            <input type='submit'/>
            </form>
            <ul className='button'>
                {error?.map(e => <li>{e}</li>)}
             
            </ul>
            <NavLink to="/login">
            <p className='button' onClick={() => setError(null)}>Already have an account?</p>
            </NavLink>
        </div>
    );
}

export default Signup