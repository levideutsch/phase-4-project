import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";


function CategoryLinks({ category }) {
    const { loggedIn } = useContext(UserContext)
    // const {id} = useParams() 

    if (loggedIn) {

    return(
    
            <div>
            <Link to={`/categories/${category.id}`}>
              
              <p>{category.category}</p>
            </Link>
          </div>
      
    )
    } else {
      return (
        <h3>Not Authorized - Please Signup or Login</h3>
        )
    }

}
export default CategoryLinks