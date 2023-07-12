import React, { useState, useContext } from 'react'
import { UserContext } from './context/user'
import { NavLink } from 'react-router-dom'
import LoadingPage from './LoadingPage';


export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const { login, error, setError } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password)
    } catch (error) {
      console.log(error);
      setErrors()
    } finally {
      setIsLoading(false);
      setErrors([])
    }
  };

  console.log(errors)

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   login(username, password)
  //   setIsLoading(false)
  //   setErrors([])
  // }

  if (isLoading)
    return <LoadingPage />;

  return (
    <div>
      <h1 className='button'>Sign In</h1>
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
        />
        <br/>
        <input type='submit'/>
        <p className="button">{error}</p>
      </form>
      {/* only render a list of errors if we have them */}
     
    
       {/* {errors.length > 0
        ? <ul className='button'>
            {errors.map(error => <li>{error}</li>)}
        </ul>
        : null}  */}
        <br/>
      <NavLink to='/signup'>
          <p className='button' onClick={() => setError([])}> Need Account?</p>
      </NavLink>
    </div>
  )
}
