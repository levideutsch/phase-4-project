import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

function UsersProfilePage() {
    const { user, loggedIn } = useContext(UserContext)



    const addProfilePhoto = (e) => {
        e.preventDefault()

        // fetch("/me")
        
    }


console.log(user)
    if (loggedIn) {
    return (
        <div>
       <div className="button">{user.username}'s Profile page</div> 
       <form className="button" onSubmit={null}>
       <input
       placeholder="Add profile photo"
       type="text"
       id="image"
       name="image"
       value={null}
       onChange={null}/>
       <input type="submit"/>
       </form>
       </div>
    )
    } else {
        return (
            <div className="error-container">
            <h3>Not Authorized - Please </h3>
            <div className="links-container">
              <Link to="/signup"><h3>Signup</h3></Link>
              <h3>Or</h3>
              <Link to="/login"><h3>Login</h3></Link>
            </div>
           </div>        
        )
    }
}
export default UsersProfilePage