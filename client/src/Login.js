import React, { useState, useContext } from 'react'
import { UserContext } from './context/user'
import { useNavigate,  NavLink } from 'react-router-dom'
import LoadingPage from './LoadingPage';


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const {login} = useContext(UserContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);



//   function handleSubmit(e) {
//     e.preventDefault();
  
//     fetch("/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     }).then((r) => {
//       if (r.ok) {
//         r.json().then((user) => login(user)).then(navigate("/"))
//       } else {
//         setUsername("")
//         setPassword("")
//         const error = r.errors.map(e => <li>{e}</li>) 
//         r.json().then((err) => setErrorsList(err.errors));
//         setErrorsList(error)
//       }
//     });
//   }

    // function handleLogin(e) {
    //     e.preventDefault()

    //     fetch("/login", {
    //         method: 'POST',
    //         headers: {'content-type':'application/json'},
    //         body: JSON.stringify({
    //             username: username,
    //             password: password,
    //         }),
    //     }).then((r) => {
    //         if (r.ok) {
    //             r.json().then((user) => {
    //                 login(user);
    //                 navigate("/")
    //             })
    //         } else {
    //             setUsername("")
    //             setPassword("")
    //             // r.json().then((err) => l = err.error.map(e => <li>{e}</li>) setErrors(l))
    //             const errorList = r.errors.map(e => <li>{e}</li>)
    //             setErrors(errorList)

    //         }
    //     })
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setIsLoading(true);
       
    //     fetch("/login", {
    //         method: 'POST',
    //         headers: {'content-type': 'application/json'},
    //         body: JSON.stringify({
    //             username: username,
    //             password: password
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(user => {
    //         if (!user.errors) {
    //             login(user)
    //             navigate('/')
    //         } else {
    //             setUsername("")
    //             setPassword("")
                

    //             const errorList = user.errors.map(e => <li>{e}</li>)
    //             setErrors(errorList)
    //             setIsLoading(false);
    //         }
    //     })
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })
          .then(async (response) => {
            if (response.ok) {
              await login()
              navigate('/');
            } else {
              const error = await response.json();
              const errorList = error.errors.map((e) => <li>{e}</li>);
              setErrors(errorList);
              setIsLoading(false);
            }
          })
          .catch((error) => {
            console.log('Error:', error);
            setIsLoading(false);
          });
      };

      if (isLoading) {
        return <LoadingPage />;
      }



    return (
        <div>
            <h1 className='button'>Sign In</h1>
        <form onSubmit={handleSubmit} className='button'>
        {/* <label>Username</label> */}
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
        />{' '} 
        <br/>
        <input type='submit'/>
        </form>
        <ul className='button'>
            {errors}
        </ul>
        <NavLink to='/signup'>
            <p className='button'>Need Account?</p>
        </NavLink>
        {/* <a className='need-account' style={{ textAlign: 'center' }}>Need an account?</a> */}
    </div>
    )
}

export default Login