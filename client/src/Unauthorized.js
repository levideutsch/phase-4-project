import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context/user";


export default function Unauthorized() {

  const { categoriesError } = useContext(UserContext)

   console.log(categoriesError)
    return (
        <div className="error-container">
        <h3>{error}</h3>
        <div className="links-container">
          <Link to="/signup"><h3>Signup</h3></Link>
          <h3>Or</h3>
          <Link to="/login"><h3>Login</h3></Link>
        </div>
       </div>        
    )
}
