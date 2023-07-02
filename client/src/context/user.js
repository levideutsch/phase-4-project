import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from 'react-router-dom'


// Create context
const UserContext = React.createContext();



// Create provider component
function UserProvider({ children }) {

    //Creation of new tweet error state
    const [error, setError] = useState([]);
    // console.log(error)

    // User state
    const [user, setUser] = useState({})

  
    const [tweets, setTweets] = useState([])
    const [categories, setCategories] = useState([])


    // Logged in state
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
      
      setTweets(user.tweets) // all tweets are returned with user

      // filter user by tweets
      user.tweets = user.tweets.filter(t => t.user.id === user.id)
      setUser(user)

      setLoggedIn(true)
    }

    async function getCategories() { setCategories(await fetch("/categories").then(res => res.json())) }

    // Fetch logged in user
    useEffect(loadUser, [])
    useEffect(getCategories, [])


    // Current user adds tweet
    function addTweet(tweet) {
        fetch("/tweets", {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(tweet)
        })
        .then(res => {
            if (!res.ok) {
              throw new Error('Failed to create tweet');
            }
            return res.json();
          })
          .then(data => {
            setTweets(prevData => [data, ...prevData])
            setUser(user => ({
              ...user,
              tweets: [data, ...user.tweets],
              categories: user.categories.find(c => c.category == data.category.category)
                ? user.categories 
                : [ ...user.categories, data.category ]
            }))
            setError(null); // Reset the error state
          })
          .catch(error => {
            console.error(error);
            setError(error.message);
            // Handle the error appropriately, e.g., show an error message to the user
          });
    }

    function addTweetNew(tweet) {
      fetch("/tweets", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(tweet)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to create tweet');
        } 
        return res.json()
      })
      .then(data => {

        // const newTweet = {
        //   id: data.id,
        //   body: data.body,
        //   user_id: data.user_id,
        //   category_id: data.category_id
        // };
        // setCategories(prevData => [newTweet, ...prevData])
        setCategories(category => ({
          ...category, 
          tweets: [data, ...category.tweets],
          users: category.users.find(u => u.cat)
        }))
      })
      .catch( error => {
        console.log(error)
        setError(error.message)
      })
    }

    // function addTweetAndCategory(e) {
    //     e.preventDefault()

    //     const tweetData = {
    //         tweet: {
    //             body: 
    //         }
    //     }
    // }

    function deleteTweet(id) {
        fetch(`/tweets/${id}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete tweet');
            }
            // Filter out the deleted tweet from the user's tweets
            // setUser(prevUser => ({
            //   ...prevUser,
            //   tweets: prevUser.tweets.filter(tweet => tweet.id !== id)
            // }));
            const filter = tweet => tweet.id !== id;
            setTweets(prevData => prevData.filter(filter));
            setUser(user => ({...user, tweets: user.tweets.filter(filter)}));
          })
          .catch(error => {
            console.error(error);
            // Handle the error appropriately, e.g., show an error message to the user
          });
      }
        
    // Current user edits tweets
    // function editTweet(tweet) {
    //     fetch(`/tweets/${tweet.id}`, {
    //         method: 'PATCH',
    //         headers: {'content-type':'application/json'},
    //         body: JSON.stringify({
    //             body: tweet.body,
    //         }),
    //     })
    //     .then(res => res.json())
    //     .then((tweet) => {
    //         setUser((prevUser) => {
    //           // Check if the user's ID matches the tweet's user_id
    //           if (prevUser.id === tweet.user_id) {

    //             const updatedUser = { ...prevUser };

    //             // Update the tweets array within the user object
    //             updatedUser.tweets = prevUser.tweets.map((t) =>
    //               t.id === tweet.id ? tweet : t
    //             );
    //             // Return a new user object with the updated tweets
    //             return updatedUser
    //           }
    //           return prevUser;
    //         });
    //       })
    // };

    // function editTweet(tweet) {
    //     fetch(`/tweets/${tweet.id}`, {
    //       method: 'PATCH',
    //       headers: { 'content-type': 'application/json' },
    //       body: JSON.stringify({
    //         body: tweet.body
    //       })
    //     })
    //       .then(res => res.json())
    //       .then(updatedTweet => {
    //         setUser(prevUser => {
    //           // Check if the user's ID matches the tweet's user ID
    //           if (prevUser.id === updatedTweet.user.id) {
    //             const updatedUser = { ...prevUser };
      
    //             // Update the tweets array within the user object
    //             updatedUser.tweets = prevUser.tweets.map(t =>
    //               t.id === updatedTweet.id ? updatedTweet : t
    //             );
      
    //             // Return a new user object with the updated tweets
    //             return updatedUser;
    //           }
      
    //           return prevUser;
    //         });
    //       })
    //       .catch(error => {
    //         console.error(error);
    //         // Handle the error appropriately, e.g., show an error message to the user
    //       });
    //   }

    function editTweet(tweet) {
        fetch(`/tweets/${tweet.id}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            body: tweet.body
          })
        })
          .then(res => res.json())
          .then(updatedTweet => {

            const updateTweet = (tweet) => {
              if (tweet.id !== updatedTweet.id)
                return tweet;

              return {...tweet, body: updatedTweet.body}
            }

            // change to set category
            setTweets(tweets => tweets.map(updateTweet))
            setUser(user => ({...user, tweets: user.tweets.map(updateTweet)}))
          })
          .catch(error => {
            console.error(error);
            // Handle the error appropriately, e.g., show an error message to the user
          });
      }

      // function addProfilePhoto(user) {
      //   fetch(`/users/${user.id}`, {
      //     method: 'PATCH',
      //     headers: { 'content-type': 'application/json' },
      //     body: JSON.stringify({
      //       profile_photo: user.profile_photo
      //     })
      //   })
      //     .then(res => res.json())
      //     .then(updatedUser => {
      //       setUser(prevData => {
      //         const updatedData = prevData.map(item => {
      //           if (item.id === updatedUser.id) {
      //             // Update the tweet with the edited content
      //             return {
      //               ...item,
      //               profile_photo: updatedUser.profile_photo
      //             };
      //           }
      //           return item;
      //         });
      
      //         return updatedData;
      //       });
      //     })
      //     .catch(error => {
      //       console.error(error);
      //       // Handle the error appropriately, e.g., show an error message to the user
      //     });
      // }

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
            // Handle the error appropriately, e.g., show an error message to the user
          });
        }


      // Add new category  
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
          setError(null); // Reset the error state
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
          // Handle the error appropriately, e.g., show an error message to the user
        });
      }

    // Users logs in
    const login = async () => {
        setLoggedIn(true)
        await getCategories()
        return loadUser()
    }

    // Users logs out
    const logout = () => {
      setLoggedIn(false)
      setUser({})
      setTweets([])
      setCategories([])
    }

    // User signs up
    const signup = (user) => {
        setUser(user)
        // fetchUsersTweets()
        setLoggedIn(true)
    }


    return (
        // Add logged in to global state
        <UserContext.Provider value={{ 
            user, 
            login, 
            logout, 
            signup, 
            loggedIn, 
            addTweet, 
            addTweetNew,
            deleteTweet, 
            editTweet, 
            error,
            setError,
            addCategory,
            tweets,
            categories,
            addProfilePhoto
            }}
            >
            { children }
        </UserContext.Provider>
    );
}    

export { UserContext, UserProvider }

