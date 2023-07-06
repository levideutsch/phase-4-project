import React, { useContext } from "react";
import { UserContext } from "./context/user";

function SelectCategories({ formData, handleInputChange }) {
    const { categories } = useContext(UserContext)
 
    const categoriesList = categories.map(c => <option key={c.id} value={c.category}>{c.category}</option>)
   
    return (
        <div>
            <select 
            value={formData.category} 
            name="category"
            placeholder="Select a category"
            onChange={handleInputChange}>
            <option value="">select Category</option>
            {categoriesList}
            </select>
        </div>
    )
}
export default SelectCategories