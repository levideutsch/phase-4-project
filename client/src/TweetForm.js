import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import SelectCategories from "./SelectCategories";
import { useNavigate } from 'react-router-dom'
// import CategoryForm from "./CategoryForm";


function TweetForm({ closeTweetForm }) {
 
    const { addTweet, user } = useContext(UserContext)
    // const [categoryFormFlag, setCategoryFormFlag] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        body: "",
        category: "", 
        user_id: user.id
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

    // async function handleSubmit(e) {
    //   e.preventDefault();
    
    //   try {
    //     await addTweet(formData);
    //     closeTweetForm();
    //   } catch (error) {
    //     console.error(error);
    //     // Handle the error appropriately
    //   }
    // }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

    // async function handleSubmit(e) {
    //   e.preventDefault();
    
    //   try {
    //     // Get the form data
    //     const body = formData.body;
    //     const category = formData.category;
    
    //     // Create the new tweet object
    //     const newTweet = {
    //       body: body,
    //       category: category,
    //       user_id: user.id, // Replace with the appropriate user ID
    //     };
    
    //     // Make the POST request to add the new tweet
    //     await addTweet(newTweet);
    
    //     // Reset the form
    //     setFormData({
    //       body: "",
    //       category: "",
    //       user_id: user.id,
    //     });
    
    //     closeTweetForm();
    //   } catch (error) {
    //     console.error(error);
    //     // Handle the error appropriately
    //   }
    // }

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
        <button className="single-tweet-form"  onClick={toCategories}>Add Category</button>
        </div>
    )
}
export default TweetForm