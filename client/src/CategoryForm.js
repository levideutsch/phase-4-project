import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

function CategoryForm({ closeForm }) {

    const { addCategory, error } = useContext(UserContext)
    const [formBody, setFormBody] = useState("")

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
            {error}
        </form>
       </div>
    )
}
export default CategoryForm