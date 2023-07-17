import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "./context/user"
import { Link, NavLink, useNavigate,  useLocation } from 'react-router-dom'
import LoadingPage from './LoadingPage';


function NavigationBar() {
    const { newUser, logout, setLoggedIn, setError } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setError(null);
    }, [location.pathname, setError]);
  

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
        setError(null)
          // Was "/"
          navigate('/login');
        })
        .catch((error) => {
          console.log('Error:', error);
        })
        .finally(() => {
          setIsLoading(false);
          setError(null)
        });
    };

    if (isLoading) {
      return <LoadingPage />;
    }

    // if (!loggedIn) {
    //   return (
    //     <div>
    //         <h1 className='button'>Welcome to !Twitter</h1>
    //         <hr/>
    //     </div>
    //   )
    // }

    return (
      <div>
        <nav>
          <ul>
            <li><strong onClick={backHome}>!Twitter</strong></li>
            <Link to="/my-profile">
            <li><a href="/" className="secondary">Hello {newUser?.username}</a></li>
            {newUser.profile_photo ?
             <img className='profile-photo' src={newUser?.profile_photo} alt='Your profile'></img> 
            :
            null}
           
            </Link>
          </ul>
          <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <br/>
              <li><NavLink to="/users-page">{newUser?.username}'s Stuff</NavLink></li>
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