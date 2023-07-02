import React, { useContext, useState } from 'react';
import { UserContext } from "./context/user"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoadingPage from './LoadingPage';


function NavigationBar() {
    const { user, logout, loggedIn } = useContext(UserContext)
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
            navigate('/');
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

    // If user is logged in display user's name with button option to log user out
    if (loggedIn) {
        return (
            <div>
                {/* <h1 onClick={backHome}>!Twitter.com</h1>
                <h3>Hello {user.username}</h3>
                <button className="button" onClick={backHome}>Home</button>
                <NavLink to='/tweets'>
                    <button className='button'>Tweets</button>
                </NavLink>
                <NavLink to='/categories'>
                    <button className='button'>Categories</button>
                </NavLink>
                <button className='button' onClick={logoutUser}>Logout</button>
                <hr/> */}
 {/* <aside>
    <nav  aria-label="breadcrumb">
  <ul>
  <li className='app-title'><strong>!Twitter</strong></li>
    <li><a href="#" class="secondary">Hello {user.username}</a></li>
  </ul>
  <ul> */}
    {/* <h3>Hello {user.username}</h3>
    <button className="button" onClick={backHome}>Home</button>
    <NavLink to='/tweets'>
    <button className='button'>Tweets</button>
    </NavLink>
    <NavLink to='/categories'>
    <button className='button'>Categories</button>
    </NavLink>
    <button className='button' onClick={logoutUser}>Logout</button> */}
   
{/*     
      <NavLink to="/">
      <li><a>Home</a></li>
      </NavLink>     
      <br/>
      <NavLink to="/tweets">
      <li><a>My Tweets</a></li>
      </NavLink>
      <br/>
      <NavLink to="/categories">
      <li><a>Categories</a></li>
      </NavLink>
      <br/>
      <li onClick={logoutUser}><a>Logout</a></li>
  </ul>
  <ul>
    <li><a href="#" class="secondary"></a></li> */}
   
  {/* </ul>
</nav>
</aside>
{/* <h3>Hello {user.username}</h3> */}
{/* <hr/> */} 
{/* 
<h1 onClick={backHome}>!Twitter.com</h1>
<h3>Hello {user.username}</h3>
<button className="button" onClick={backHome}>Home</button>
<NavLink to='/tweets'>
  <button className='button'>Tweets</button>
</NavLink>
<NavLink to='/categories'>
  <button className='button'>Categories</button>
</NavLink>
<button className='button' onClick={logoutUser}>Logout</button>
<hr/> */}

<nav>
  <ul>
    <li><strong onClick={backHome}>!Twitter</strong></li>
    <Link to="/my-profile">
    <li><a href="/" class="secondary">Hello {user.username}</a></li>
    <img className='profile-photo' src={user.profile_photo} alt='Your profile'></img>
    </Link>
  </ul>
  <ul>
      <NavLink to="/">
      <li><a href="#">Home</a></li>
      </NavLink> 
      <br/>
      <NavLink to="/tweets">
      <li><a>My Stuff</a></li>
      </NavLink>
      <br/>
      <NavLink to="/categories">
      <li><a>Categories</a></li>
      </NavLink>
      <br/>
      <NavLink to="/new-home">
      <li><a>New Home</a></li>
      </NavLink>
      <br/>
      <li onClick={logoutUser}><a>Logout</a></li>
  </ul>
</nav>
<hr/>
</div>
        );
    // But if user is logged out then give user option either to login or signup    
    } else {
        return (
            <div>
                <h1 className='button'>Welcome to !Twitter</h1>
                {/* <NavLink to='/login'>
                    <button className='button'>Login</button>
                </NavLink>
                <NavLink to='/signup'>
                    <button className='button'>Signup</button>
                </NavLink> */}

                <hr/>
            </div>
        )
    }
}

export default NavigationBar