import React, { useContext } from 'react'
import { UserContext } from './context/user'
// import TwitterFeed from './TwitterFeed'
import TestPage from './TestPage'
import Login from './Login'
// import { Link } from 'react-router-dom'

function Home() {
    const { user, loggedIn } = useContext(UserContext)


    if (loggedIn) {
        return (
            <div> 
                <h3 className='button'> {user.username}'s Home Page</h3>
                {/* <TwitterFeed /> */}
                <TestPage />
            </div>
        )
    } else {
        // <Login/>
        // return (<h3>Please Login or Signup</h3>)
        return (
            <Login />
        //     <div className="error-container">
        //     <h3>Not Authorized - Please </h3>
        //     <div className="links-container">
        //       <Link to="/signup"><h3>Signup</h3></Link>
        //       <h3>Or</h3>
        //       <Link to="/login"><h3>Login</h3></Link>
        //     </div>
        //    </div>
        )
    };
}

export default Home