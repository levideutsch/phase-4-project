import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
// import { useNavigate } from "react-router-dom";

function CategoryForm({ closeForm }) {

    const { addCategory } = useContext(UserContext)
    const [formBody, setFormBody] = useState("")

    // Submit new category to categories list
    function handleSubmit(e) {
        e.preventDefault()

        addCategory({ category: formBody });
        closeForm(false)
    }


    return (
       <div>
         <form className="button" onSubmit={handleSubmit}>
            <label>Add Category:</label>
            <input
            type="text"
            id="category"
            name="category"
            value={formBody.category}
            onChange={(e) => setFormBody(e.target.value)}/>
            <input type="submit"/>
            <br/>
        </form>
       </div>
    )
}
export default CategoryForm