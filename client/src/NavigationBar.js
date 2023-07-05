import React, { useContext, useState } from 'react';
import { UserContext } from "./context/user"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoadingPage from './LoadingPage';


function NavigationBar() {
    const { user, logout, loggedIn, setLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    

    const backHome = () => {
        navigate("/")
    }

    // DELETE request to logout user
    // const logoutUser = () => {
    //     setIsLoading(true);

    //     fetch("/logout", {
    //         method:'DELETE',
    //         headers: {'content-type': 'application/json'}
    //     })
    //     .then(() => {
    //         logout()
    //         navigate("/")
    //     })
    // };

    const logoutUser = () => {
      setIsLoading(true);
  
      fetch('/logout', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      })
        .then(() => {
          logout();
        setLoggedIn(false)
          // Was "/"
          navigate('/login');
        })
        .catch((error) => {
          console.log('Error:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (isLoading) {
      return <LoadingPage />;
    }

    if (!loggedIn) {
      return (
        <div>
            <h1 className='button'>Welcome to !Twitter</h1>
            <hr/>
        </div>
      )
    }

    return (
      <div>
        <nav>
          <ul>
            <li><strong onClick={backHome}>!Twitter</strong></li>
            <Link to="/my-profile">
            <li><a href="/" className="secondary">Hello {user.username}</a></li>
            <img className='profile-photo' src={user.profile_photo} alt='Your profile'></img>
            </Link>
          </ul>
          <ul>
              {/* <li><NavLink to="/">Home</NavLink></li> */}
              <li><NavLink to="/">Home</NavLink></li>
              <br/>
              <li><NavLink to="/tweets">My Stuff</NavLink></li>
              <br/>
              <li><NavLink to="/categories">Categories</NavLink></li>
              <br/>
              <li onClick={logoutUser}><a href='/'>Logout</a></li>
          </ul>
        </nav>
        <hr/>
      </div>
    );
}

export default NavigationBar