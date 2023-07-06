import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import SelectCategories from "./SelectCategories";
import { useNavigate } from 'react-router-dom'

function TweetForm({ closeTweetForm }) {
 
    const { addTweet } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        body: "",
        category: "", 
    })

    const toCategories = () => {
        navigate("/categories")
    }

    function handleSubmit(e) {
        e.preventDefault()

        addTweet(formData)
        closeTweetForm()
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleTweetClick = (e) => {
       
        e.preventDefault()
        setIsLoading(true);
    
        setTimeout(() => {
          setIsLoading(false);
          addTweet(formData)
          closeTweetForm()
        }, 750);
      };
    

    return (
        <div className="new-tweet-form">

        <form  onSubmit={handleSubmit}>

            <label>Tweet:</label>

            <input
            placeholder="What's on your mind?"
            type="text"
            id="tweet"
            name="body"
            value={formData.body}
            onChange={handleInputChange}/>

            <SelectCategories 
            formData={formData} 
            setFormData={setFormData} 
            handleInputChange={handleInputChange}
            />

            <button
            type="submit"
            aria-busy={isLoading ? 'true' : 'false'}
            onClick={handleTweetClick}
            disabled={isLoading}
            >
            {isLoading ? 'Loading...' : 'Tweet'}
            </button>

            <br/>
         
        </form>

        <button className="single-tweet-form"  onClick={toCategories}>Add Category</button>
        
        </div>
    )
}
export default TweetForm