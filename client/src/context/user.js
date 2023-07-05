//❌
import React, { useState, useEffect } from "react";

// 🟩 When good response
// 🟥 When bad response
// ⬜️ When sate being updated



// Create context for entire app
const UserContext = React.createContext();



// Create provider component
function UserProvider({ children }) {

    //Creation of error state
    const [error, setError] = useState([]);
   

    // Currently signed in user state 
    const [user, setUser] = useState({})

    // All categories with its tweets and users relationship state
    const [categories, setCategories] = useState([])

    // User Logged in state
    const [loggedIn, setLoggedIn] = useState(false)


    // Function to load signed in user
    async function loadUser() {

      // We fetch "/me"
      const response = await fetch('/me')

      //🟥 If the response was not ok, we set logged in to false
      if (!response.ok) {
        setLoggedIn(false);
        return;
      }

      //🟥 If the user has errors we set logged in to false 
      const user = await response.json()

      if (user.error) {
        setLoggedIn(false)
        return;
      }

      //🟩 But if there's no errors, 

      // Filter user by tweets
      user.tweets = user.tweets.filter(t => t.user.id === user.id)
      setUser(user)

      // Then set logged in to true
      setLoggedIn(true)
    }

    // Here we fetch all the categories with its nested tweets and users 
    async function getCategories() { setCategories(await fetch("/categories").then(res => res.json())) }

    useEffect(() => {
      async function load() {
        await getCategories();
        // ensure we don't load the user until we have the categories
        await loadUser();
      }
      load(); // call the async function as per the warning message
    }, [])

    //////////////////////////////////////////////////

    // Here we enable user to add a new tweet and update its state
    async function addTweet(tweet) {

      try {

        // We make the initial POST request to "/tweets"
        const response = await fetch("/tweets", {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(tweet)
        });
    
        //🟥 If the response was bad
        if (!response.ok)
          // Throw this error
          throw new Error('Failed to create tweet');

        //🟩 But if the response is good ("data" is the newly created tweet)
        const data = await response.json();

        // We create the variable addTweet and use the spread operator to add the new piece of data to our tweets
        const addTweet = (tweets) => [data, ...tweets];

        // We also create a variable updateCategory to check if the newly created tweets category is the same as the inputted category
        const updateCategory = (category) => {
          if (category.category !== data.category.category)
            // Then keep it as it was  
                return category;

            // But if it is the same, then use the spread operator to copy existing categories data, then in its nested tweets
            // add the new tweet with the add tweets variable we created earlier    
            return { ...category, tweets: addTweet(category.tweets) };
        }

        //⬜️ Then we go ahead and update our categories state
        setCategories(categories => { 

          // Check if the newly created tweets (data) category exists
          const categoryExists = categories.some(category => category.category === data.category.category);

          // If the newly created tweets category does exist update it
          if (categoryExists) {
            return categories.map(updateCategory);
          }

          // If the category does not exist, add a new category including the new tweet
          return [...categories, { ...data.category, tweets: [data] }];
        });


        //⬜️ Then we go ahead and set state for our user state with the updated data
        setUser(prevUser => ({

          // We use the spread operator to copy our previous user state
          ...prevUser,

          // We then go into its tweets array, and use our previously created "addTweet" variable to store
          // Our previous tweets, and by default the newly created "data" from the "addTweet" variable
          tweets: addTweet(prevUser.tweets),

          // Then we go into our user state categories, and check if our newly created tweets category exists.
          categories: prevUser.categories.some(category => category.category === data.category.category)

          // If it does, don't add to categories (because it already exists)
            ? prevUser.categories.map(updateCategory)
          // If the newly created tweets category does not exist, then add it to the categories  
            : [...prevUser.categories, { ...data.category, tweets: [data] }]
        }));

        // After setting all the category & users state, 
        setError(null); // Reset the error state

        //🟥 If there are errors to catch...
      } catch (error) {
        console.error(error); 
        setError(error.message);
      }
    }

    // Here we enable our user to delete a tweet
    function deleteTweet(id) {
      fetch(`/tweets/${id}`, {
        method: 'DELETE'
      })
      .then(response => {

        //🟥 If the response is bad
        if (!response.ok)
        // Throw this error
          throw new Error('Failed to delete tweet');

        //🟩 But if its good, 

        // Lets first create a variable to store the deletion logic using a filter ID (for the user state)
        const tweetFilter = (tweet) => tweet.id !== id

        // Then the same logic fot the category state, but copying categories, going into its tweets, and 
        // Filtering it by its ID using tweetFilter
        const categoryMap = (category) => ({...category, tweets: category.tweets?.filter(tweetFilter) || []})

        //⬜️ Now we go ahead and update categories state, by using the logic of categoryMap
        setCategories(categories => categories.map(categoryMap));

        //⬜️ Then update our user state 
        setUser(user => ({
          // By copying our user
            ...user,

          // Then going into our tweets, filtering it with the tweetFilter logic  
            tweets: user.tweets.filter(tweetFilter),

          // And do the same thing with users categories bu using the logic of categoryMap   
            categories: user.categories
              .map(categoryMap),
          }));
        })

        //🟥 Handle the error appropriately, e.g., show an error message to the user
        .catch(error => {
          console.error(error);
        });
    }

    // Here we enable our user to edit a single tweet
    function editTweet(updatedTweet) {

      // Patch request to "/tweets"
      fetch(`/tweets/${updatedTweet.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({

          // We send back the new updated tweets body
          body: updatedTweet.body
        })
      })
        .then(res => res.json())
        .then(() => {

          // Then we create the logic to update tweet
          const updateTweet = (tweet) => {

            // By checking if the ID of the old tweet is not the same as the ID of the newly updated tweet
            if (tweet.id !== updatedTweet.id)

            // If their IDs don't match, return the same old unedited tweet
            return tweet;

            // But if their IDs are the same, then update that tweets body with that ID
            return { ...tweet, body: updatedTweet.body };
          }

          // We then create the logic to update category
          const updateCategory = (category) => {

            //Check If the id of the old tweets category does not match the updated tweets category ID
            if (category.id !== updatedTweet.category_id) {
              // If it does not match, then return the old tweets category
              return category
            }

            // But if it does match, then iterate through categories, find its tweets, and use the "updateTweet" logic to update 
            // That specific tweet
            return { ...category, tweets: category.tweets?.map(updateTweet) || []}
          }

          //⬜️ Update in categories store, by using logic from updateCategory
          setCategories(prevCategories => prevCategories.map(updateCategory));
    
          //⬜️ update the Tweets in the user store, by using updateTweet logic for tweets, and updateCategory logic for 
          // users categories 
          setUser(user => ({
              ...user,
              tweets: user.tweets.map(updateTweet),
              categories: user.categories.map(updateCategory),
          }));
        })

         //🟥 Handle the error appropriately, e.g., show an error message to the user
        .catch(error => {
          console.error(error);
        });
    }

    function addProfilePhoto(user) {
      fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          profile_photo: user.profile_photo
        })
      })
      .then(res => res.json())
      .then(updatedUser => {
        // ⬜️
        setUser(prevData => {
          if (Array.isArray(prevData)) {
            const updatedData = prevData.map(item => {
              if (item.id === updatedUser.id) {
                // Update the user with the edited profile photo
                return {
                  ...item,
                  profile_photo: updatedUser.profile_photo
                };
              }
              return item;
            });
  
            return updatedData;
          }
          
          return prevData;
        });
      })
      .catch(error => {
        console.error(error);
        //🟥 Handle the error appropriately, e.g., show an error message to the user
      });
    }

    // Here we enable user to add a new category
    function addCategory(category) {

      // We make our initial POST request to "/categories"
      fetch("/categories", {
        method: 'POST',
        headers: {'content-type': 'application/json'},

        // We add the newly created category here
        body: JSON.stringify(category)
      })
      .then(res => {

        //🟥 If the response was bad
        if (!res.ok) {

          // Throw this error
          throw new Error('Failed to create category');
        }

        //🟩 But if the response was good, do this
        return res.json();
      })

      //⬜️ Then we add this newly created category to our categories array
      .then(newCategory => {
        setCategories(prevCategories => [newCategory, ...prevCategories]);

        // And set errors to null
        setError(null); // Reset the error state
      })

      //🟥 Handle the error appropriately, e.g., show an error message to the user
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
    }

    // Users logs in
    const login = async (username, password) => {

      // We make a POST request to "/login"
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        // And were creating a login POST fetch with username and password
        body: JSON.stringify({ username, password }),
      })

      //🟥 If the response is bad
      if (!response.ok) {
        const error = await response.json();
        return Promise.reject(error.errors)
      }

      //🟩 But if its good
      await getCategories() // required to show homepage
      await loadUser() // sets loggedIn to true
    }

    // Users logs out
    const logout = () => {

      // When user logs out..
      setLoggedIn(false)
      setCategories([])
      setUser({})
      // Set our loggedIn state to false
      // setLoggedIn(false)

      // Set our User state to an empty object
      // setUser({})

      // And then set our categories state to an empty array
      // setCategories([])
    }

    // User signs up
    const signup = async (username, password, password_confirmation) => {

      const response = await fetch("/signup", {
        method: 'POST',
        headers: {'content-type': 'application/json'},

        // We then stringify the new username, password, and password confirm
        body: JSON.stringify({ username, password, password_confirmation })
      })

      const data = await response.json()

      if (!response.ok || data.errors)
        return Promise.reject(data.errors || ['Server Error'])

      await getCategories() // required to show homepage
      await loadUser() // sets loggedIn to true
    }


    return (
        // Add logged in to global state
        <UserContext.Provider value={{ 
          user,
          loadUser,
          login,
          logout,
          signup,
          loggedIn,
          setLoggedIn,
          addTweet,
          deleteTweet,
          editTweet,
          error,
          setError,
          addCategory,
          categories,
          addProfilePhoto
          }}
        >
          { children }
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider }
