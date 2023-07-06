import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {

    const [error, setError] = useState([]);
   
    const [user, setUser] = useState({})

    const [categories, setCategories] = useState([])

    const [loggedIn, setLoggedIn] = useState(false)


  
    async function loadUser() {
      const response = await fetch('/me')
      if (!response.ok) {
        setLoggedIn(false);
        return;
      }
      const user = await response.json()

      if (user.error) {
        setLoggedIn(false)
        return;
      }
      user.tweets = user.tweets.filter(t => t.user.id === user.id)
      setUser(user)
      setLoggedIn(true)
    }

    const login = async (username, password) => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        const error = await response.json();
        return Promise.reject(error.errors)
      }
      await getCategories() 
      await loadUser() 
    }

   
    const logout = () => {
      setLoggedIn(false)
      setCategories([])
      setUser({})
      // setLoggedIn(false)
      // setUser({})
      // setCategories([])
    }

    
    const signup = async (username, password, password_confirmation) => {
      const response = await fetch("/signup", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ username, password, password_confirmation })
      })
      const data = await response.json()
      if (!response.ok || data.errors)
        return Promise.reject(data.errors || ['Server Error'])
      await getCategories() 
      await loadUser() 
    }

    
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
    
    async function addTweet(tweet) {
      try {
        const response = await fetch("/tweets", {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(tweet)
        });
        if (!response.ok)
          throw new Error('Failed to create tweet');

        const data = await response.json();

        const addTweet = (tweets) => [data, ...tweets];

        const updateCategory = (category) => {
          if (category.category !== data.category.category)
                return category;  
            return { ...category, tweets: addTweet(category.tweets) };
        }

        
        setCategories(categories => { 
          return categories.map(updateCategory);

          // const categoryExists = categories.some(category => category.category === data.category.category);

          // // If the newly created tweets category does exist update it
          // // if (categoryExists) {
          // //   return categories.map(updateCategory);
          // // }

          // // If the category does not exist, add a new category including the new tweet
          // return [...categories, { ...data.category, tweets: [data] }];
        });


        setUser(prevUser => ({
          ...prevUser,
          tweets: addTweet(prevUser.tweets),

          categories: prevUser.categories.some(category => category.category === data.category.category)
            ? prevUser.categories.map(updateCategory)
            : [...prevUser.categories, { ...data.category, tweets: [data] }]
        }));

        setError(null); 
      } catch (error) {
        console.error(error); 
        setError(error.message);
      }
    }

    
    function deleteTweet(id) {
      fetch(`/tweets/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok)
          throw new Error('Failed to delete tweet');

        const tweetFilter = (tweet) => tweet.id !== id

        const categoryMap = (category) => ({...category, tweets: category.tweets?.filter(tweetFilter) || []})

        setCategories(categories => categories.map(categoryMap));

        setUser(user => ({
            ...user,
            tweets: user.tweets.filter(tweetFilter),
            categories: user.categories
              .map(categoryMap),
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }

    
    function editTweet(updatedTweet) {
      fetch(`/tweets/${updatedTweet.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          body: updatedTweet.body
        })
      })
        .then(res => res.json())
        .then(() => {

          const updateTweet = (tweet) => {
            if (tweet.id !== updatedTweet.id)
            return tweet;
            return { ...tweet, body: updatedTweet.body };
          }

          const updateCategory = (category) => {
            if (category.id !== updatedTweet.category_id) {
              return category
            }
            return { ...category, tweets: category.tweets?.map(updateTweet) || []}
          }

          setCategories(prevCategories => prevCategories.map(updateCategory));
    
          setUser(user => ({
              ...user,
              tweets: user.tweets.map(updateTweet),
              categories: user.categories.map(updateCategory),
          }));
        })
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
        setUser(prevData => {
          if (Array.isArray(prevData)) {
            const updatedData = prevData.map(item => {
              if (item.id === updatedUser.id) {
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
      });
    }

    
    function addCategory(category) {
      fetch("/categories", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(category)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to create category');
        }
        return res.json();
      })
      .then(newCategory => {
        setCategories(prevCategories => [newCategory, ...prevCategories]);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
    }
    
    return (
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
