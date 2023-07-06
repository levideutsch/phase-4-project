import React, { useState, useContext } from "react";
import { UserContext } from './context/user'
import CategoryForm from "./CategoryForm";
import CategoryLinks from "./CategoryLinks";

function Categories() {

  const [createCategoryFlag, setCreateCategoryFlag] = useState(false)
  const { categories, error } = useContext(UserContext)

  const categoriesLinks = categories?.map(c => <CategoryLinks key={c.id} category={c}/>)

  const handleNewCategoryOpen = () => {
    setCreateCategoryFlag(true)
  }

  return (
    <div>

      <hgroup className="button">
        <h2>Categories</h2>
      </hgroup>

      <article className="button">
        {categoriesLinks}
      </article>

      <hr/>

      {createCategoryFlag
        ? <CategoryForm closeForm={setCreateCategoryFlag}/>
        : <button onClick={handleNewCategoryOpen} className="button">Add Category</button>}
        
      {createCategoryFlag
        ? null
        : error && <div className="button">{error}</div>}

    </div>
  )
}

export default Categories