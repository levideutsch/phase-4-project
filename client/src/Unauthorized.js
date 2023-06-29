import { Link } from "react-router-dom";

export default function Unauthorized() {
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
