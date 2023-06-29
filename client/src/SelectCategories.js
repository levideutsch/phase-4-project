import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from 'react-router-dom'

function SelectCategories({ formData, setFormData, handleInputChange }) {
    const { categories } = useContext(UserContext)
    // const navigate = useNavigate()
    const categoriesList = categories.map(c => <option key={c.id} value={c.category}>{c.category}</option>)


    // const handleCategoryChange = (e) => {
    //   setFormData(e.target.value)
    // }
   

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