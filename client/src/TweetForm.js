import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import SelectCategories from "./SelectCategories";
import { useNavigate } from 'react-router-dom'
// import CategoryForm from "./CategoryForm";


function TweetForm({ closeTweetForm }) {
 
    const { addTweet, addTweetNew } = useContext(UserContext)
    // const [categoryFormFlag, setCategoryFormFlag] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        body: "",
        category: ""
    })


    const toCategories = () => {
        // setCategoryFormFlag(false)
        navigate("/categories")
    }

    function handleSubmit(e) {
        e.preventDefault()

        addTweet(formData)
        // addTweetNew(formData)
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
          // addTweetNew(formData)
          closeTweetForm()

        }, 750);
      };

  
// console.log(formData.body)
// console.log(formData.category)

    // const handleTweetSubmit = (e) => {
    //     e.preventDefault();
    
    //     // const newTweetData = {

    //     //     body: newTweetBody,
    //     //     category: newCategoryBody
    
    //     // };
    
    //     fetch('/tweets', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         body: formData.body,
    //         category: formData.category
    //       })
    //     })
    //       .then((response) => {
    //         if (response.ok) {
    //           return response.json();
    //         } else {
    //           throw new Error('Failed to create tweet');
    //         }
    //       })
    //       .then((newData) => {
    //         // Handle successful tweet creation
    //         console.log(newData);
    //       })
    //       .catch((error) => {
    //         // Handle error
    //         console.error(error);
    //       });
    
    //     // Reset form state
    //     setNewTweetBody('');
    //     setNewCategoryBody("");
    //   };
    

    return (
        <div>
        <form className="button" onSubmit={handleSubmit}>
            <label>Tweet:</label>
            <input
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
            {/* <input type="submit"/> */}
            <button
                //   className="button"
                  type="submit"
                  aria-busy={isLoading ? 'true' : 'false'}
                  onClick={handleTweetClick}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Tweet'}
              </button>

              {/* <a href="#" aria-busy="true">Generating link, please wait…</a> */}
            <br/>
            {/* <button className="button" onClick={toCategories}>Add Category</button> */}
        </form>
        <button className="button" onClick={toCategories}>Add Category</button>
        </div>
    )
}
export default TweetForm