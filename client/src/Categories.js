import React, { useState, useContext } from "react";
import { UserContext } from './context/user'
import CategoryForm from "./CategoryForm";
import CategoryLinks from "./CategoryLinks";
import { Link } from "react-router-dom";

function Categories() {

// const [isOpen, setIsOpen] = useState(false) 
const [createCategoryFlag, setCreateCategoryFlag] = useState(false)  
const { categories, loggedIn } = useContext(UserContext)
// const categoriesList = categories.map(c => <li key={c.id}>{c.category}</li>)
const categoriesLinks = categories?.map(c => <CategoryLinks key={c.id} category={c}/>)

// const handleOpen = () => {
//     setIsOpen((isOpen) => !isOpen);
//     // setIsOpen(!isOpen);
//   };

const handleNewCategoryOpen = () => {
  setCreateCategoryFlag(true)
}  


if (loggedIn) {

    return (
        <div>
      {/* <button onClick={handleOpen}>Dropdown</button> */}
      {/* {isOpen ? (
        <ul className="menu">
          <li className="menu-item"> */}
            {/* {categoriesLinks} */}
            <hgroup className="button">
              <h2>Categories</h2>
              {/* <h3></h3> */}
            </hgroup>
            <article className="button">
            {categoriesLinks}
            </article>
          {/* </li>
        </ul> */}
      {/* ) : null} */}
      {/* {isOpen ? <div>Is Open</div> : <div>Is Closed</div>} */}
      <hr/>
      {createCategoryFlag ? <CategoryForm closeForm={setCreateCategoryFlag}/> : <button onClick={handleNewCategoryOpen} className="button">Add Category</button>}
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
export default Categories