import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from 'react-router-dom'


// Create context
const UserContext = React.createContext();



// Create provider component
function UserProvider({ children }) {

    //Creation of new tweet error state
    const [error, setError] = useState([]);
    console.log(error)
    // User state
    const [user, setUser] = useState({})

    const [tweetsAndCategories, setTweetsAndCategories] = useState([])
    // All categories
    const [categories, setCategories] = useState(["No Tweets"])

    // Logged in state
    const [loggedIn, setLoggedIn] = useState(false)

    // Current users tweets
    const [userTweets, setUserTweets] = useState([])


    // Fetch logged in user
    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setUser(data)
            setTweetsAndCategories(data.tweets)
            if (data.error) {
                setLoggedIn(false)
            } else {
                setLoggedIn(true)
            //    setUserTweets(data)
            // fetchUsersTweets()
            }
        })
    }, [])




//    const blah =  userTweets.map((tweet) => (
//         <div key={tweet.id}>
//           <p>Body: {tweet.body}</p>
//           <p>Category: {tweet.category.category}</p>
//           <p>User: {tweet.user.username}</p>
//         </div>
//       ))

    // Fetch all categories
    useEffect(() => {
        fetch("/categories")
        .then(res => res.json())
        .then(data => setCategories(data))
    }, [])

  
    // Fetch current users Tweets
    // function fetchUsersTweets() {
    //     fetch("/tweets")
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log(data)
    //         setUserTweets(data)
    //     })
    // }


    // Current user adds tweet
    function addTweet(tweet) {
        fetch("/tweets", {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(tweet)
        })
        // .then(res => res.json())
        // .then(data => {
        //     setUserTweets([data, ...userTweets])
        // })
        .then(res => {
            if (!res.ok) {
              throw new Error('Failed to create tweet');
            }
            return res.json();
          })
          .then(data => {
            setTweetsAndCategories(prevData => [data, ...prevData]);

            // setUserTweets([data, ...userTweets]);
            // setUser([data, user.tweets])
            // setUser(prevUser => ({
            //     ...prevUser,
            //     tweets: [data, ...prevUser.tweets]
            //   }));
            // setTweetsAndCategories(prevTweets => [data, ...prevTweets]);
            //   setTweetsAndCategories(prevTweets => ({
            //     ...prevTweets,
            //     tweets: [data, ...prevTweets]
            //   }))
            
            setError(null); // Reset the error state
          })
          .catch(error => {
            console.error(error);
            setError(error.message);
            // Handle the error appropriately, e.g., show an error message to the user
          });
    }

    // function addTweetAndCategory(e) {
    //     e.preventDefault()

    //     const tweetData = {
    //         tweet: {
    //             body: 
    //         }
    //     }
    // }
  
    // Current user deletes tweets
    // function deleteTweet(id) {
    //     fetch(`/tweets/${id}`, {
    //         method: 'DELETE'
    //     })
    //     // .then(setUserTweets(
    //     //     userTweets.filter(tweet => tweet.id !==id)
    //     // ))
    //     setUser(prevUser => ({
    //         ...prevUser,
    //         tweets: prevUser.tweets.filter(tweet => tweet.id !== id)
    //     }));
        
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
            setTweetsAndCategories(prevData => prevData.filter(tweet => tweet.id !== id));
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
            setTweetsAndCategories(prevData => {
              const updatedData = prevData.map(item => {
                if (item.id === updatedTweet.id) {
                  // Update the tweet with the edited content
                  return {
                    ...item,
                    body: updatedTweet.body
                  };
                }
                return item;
              });
      
              return updatedData;
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
    const login = (user) => {
        setUser(user)
        // fetchUsersTweets()
        setLoggedIn(true)
    }

    // Users logs out
    const logout = () => {
        setUser({})
        setUserTweets([])
        setLoggedIn(false)
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
            userTweets, 
            addTweet, 
            deleteTweet, 
            editTweet, 
            categories,
            error,
            setError,
            addCategory,
            tweetsAndCategories,
            }}
            >
            { children }
        </UserContext.Provider>
    );
}    

export { UserContext, UserProvider }

