import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {

    const [error, setError] = useState([]);
   
    const [user, setUser] = useState({})

    const [categories, setCategories] = useState([])

    const [loggedIn, setLoggedIn] = useState(false)

    const [newUser, setNewUser] = useState({})//🟥

 
    const login = async (username, password) => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        const error = await response.json();
        // return Promise.reject(error.errors)
        setError(error.errors)
      }
      await getCategories() 
      await loadUser() 
    }

    async function loadUser() {
      const response = await fetch('/me')
      if (!response.ok) {
        setLoggedIn(false);
        return;
      }
      const newUser = await response.json()

      if (!newUser) {
        setError(error.error)
        console.log(error)
        setLoggedIn(false)
        return;
      }
      // user.tweets = user.tweets.filter(t => t.user.id === user.id)
      // setUser(user)
      setNewUser(newUser)//🟥
      setLoggedIn(true)
      // console.log(user.tweets)
    }

    useEffect(() => {
      async function load() {
        await getCategories();
        // ensure we don't load the user until we have the categories
        await loadUser();
      }
      load(); // call the async function as per the warning message
    }, [])

    const logout = () => {
      setCategories([])
      setLoggedIn(false)
     
      setNewUser({})//🟥 
      // setUser({})
      // setNewUser({})//🟥 
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
      .then(response => {
        if(!response.ok) {
          response.json().then(errors => {
            setError(errors.errors)
            console.log(errors)
          })
        } else {
     getCategories() 
     loadUser() 
        }
      })
  
        // return Promise.reject(data.errors || ['Server Error'])

      // await getCategories() 
      // await loadUser() 
    }

    
    async function getCategories() { setCategories(await fetch("/categories").then(res => res.json())) }
    


    //////////////////////////////////////////////////

    function addNewTweet(newTweet) {
      fetch("/tweets", {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newTweet)
      })
      .then((response) => {
        if (!response.ok) {
          response.json().then((err) => setError(err.errors));
        } else {
          response.json().then((data) => {

          // Updating newUser state  

          // Check if the new tweets category already exists
           const findIfCategoryUserState = newUser.categories.find(c => c.category === data.category.category)

           // If the newUser does not already have that category
           if (!findIfCategoryUserState) {
            setNewUser({
              // Copy newUser
              ...newUser,
              // Go into newUser's tweets, and update with our new tweet {body: data.body} 
              tweets: [data, ...newUser.tweets],
              // Go into newUser's categories and, and at the new category to newUser along with that tweets ID.
              categories: [{category: data.category.category, id: data.category.id}, ...newUser.categories] 
            })
            // But if the category already exists
           } else {
            setNewUser({
              // Cope newUser
              ...newUser,
              // And only update the newUser's tweets and NOT categories because that category already exists
              tweets: [data, ...newUser.tweets]

            })
          }
            

            // Objective: add new tweet to setCategories         


            setCategories(prevCategories => {
             
              return prevCategories.map(category => {
                
                const mappedCategories = { ...category}
              
                if(category.id === data.category_id) {
                  category.tweets = [
                    { 
                      id: data.id,
                      body: data.body,
                      user_id: data.user_id,
                      category_id: data.category_id
                    },
                    ...category.tweets]

                  category.users = [
                  {
                  
                    id: data.user.id,
                    username: data.user.username

                  },
                  ...category.users]    
                }
                return mappedCategories
              })
            }
          )}
        );
      }
    })
      .catch((error) => {
        console.log(error);
     
      });
      // debugger
      console.log(categories)
    }

    
    // async function addTweet(tweet) {
    //   try {
    //     const response = await fetch("/tweets", {
    //       method: 'POST',
    //       headers: {'content-type': 'application/json'},
    //       body: JSON.stringify(tweet)
    //     });
    //     if (!response.ok)
    //       throw new Error('Failed to create tweet');
         

    //     const data = await response.json();

    //     const addTweet = (tweets) => [data, ...tweets];

    //     const updateCategory = (category) => {
    //       if (category.category !== data.category.category)
    //             return category;  
    //         return { ...category, tweets: addTweet(category.tweets) };
    //     }

        
    //     setCategories(categories => { 
    //       return categories.map(updateCategory);

    //       const categoryExists = categories.some(category => category.category === data.category.category);

    //       // If the newly created tweets category does exist update it
    //       if (categoryExists) {
    //         return categories.map(updateCategory);
    //       }

    //       // If the category does not exist, add a new category including the new tweet
    //       return [...categories, { ...data.category, tweets: [data] }];
    //     });


    //     setUser(prevUser => ({
    //       ...prevUser,
    //       tweets: addTweet(prevUser.tweets),

    //       categories: prevUser.categories.some(category => category.category === data.category.category)
    //         ? prevUser.categories.map(updateCategory)
    //         : [...prevUser.categories, { ...data.category, tweets: [data] }]
    //     }));

    //     setNewUser()//🟥

    //     setError(null); 
    //   } catch (error) {
    //     console.error(error); 
    //     setError(error.message);
    //   }
    // }

    function deleteNewTweet(id) {
      fetch(`/tweets/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          response.json().then((err) => setError(err.errors))
        } else {
         const tweetFilter = (tweet) => tweet.id !== id
         const categoryMap = (category) => ({...category, tweets: category.tweets?.filter(tweetFilter)})

        setNewUser(user => {
          const filteredTweets = user.tweets?.filter(tweetFilter);
          const filteredCategories = user.categories?.filter(category =>
            filteredTweets?.some(tweet => tweet.category_id === category.id)
          );
          return {
            ...user,
            tweets: filteredTweets,
            categories: filteredCategories
          };
        });

         setCategories(categories => categories.map(categoryMap))
        }
      })
    }

    // function deleteTweet(id) {
    //   fetch(`/tweets/${id}`, {
    //     method: 'DELETE'
    //   })
    //   .then(response => {
    //     if (!response.ok)
    //       throw new Error('Failed to delete tweet');

    //     const tweetFilter = (tweet) => tweet.id !== id

    //     const categoryMap = (category) => ({...category, tweets: category.tweets?.filter(tweetFilter) || []})

    //     setCategories(categories => categories.map(categoryMap));

    //     setUser(user => ({
    //         ...user,
    //         tweets: user.tweets.filter(tweetFilter),
    //         categories: user.categories
    //           .map(categoryMap),
    //       }));

    //       setNewUser()

    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }

    // function editNewTweet(updatedTweet) {
    //   fetch(`/tweets/${updatedTweet.id}`, {
    //     method: 'PATCH',
    //     headers: {'content-type': 'application/json'},
    //     body: JSON.stringify({
    //       body: updatedTweet.body
    //     })
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       response.json().then((err) => setError(err.errors))
    //     } else {
    //       response.json(() => {
         
    //         const updateTweet = (tweet) => {
    //           if (tweet.id !== updatedTweet.id)
    //           return tweet;
    //           return { ...tweet, body: updatedTweet.body };
    //         }
  
    //         const updateCategory = (category) => {
    //           if (category.id !== updatedTweet.category_id) {
    //             return category
    //           }
    //           return { ...category, tweets: category.tweets?.map(updateTweet)}
    //         }
  
    //         setCategories(prevCategories => prevCategories.map(updateCategory));
      
    //         setNewUser(user => ({
    //             ...user,
    //             tweets: user.tweets.map(updateTweet),
    //             categories: user.categories.map(updateCategory),
    //         }));
    //       })
    //     }
    //   })
    // }

    function editNewTweet(updatedTweet) {
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
    
          setNewUser(user => ({
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
        setNewUser(prevData => {
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

    // function addNewCategory(newCategory) {
    //   fetch("/categories", {
    //     method: 'POST',
    //     headers: {'content-type': 'application/json'},
    //     body: JSON.stringify(newCategory)
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       response.json().then((err) => setError(err.errors))
    //     } else {
    //       response.json(data => {
    //         setNewUser()
    //         setCategories()
    //       })
    //     }
    //   })
    // }

    function addCategory(newCategory) {
      fetch("/categories", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newCategory)
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
          loadUser,
          login,
          logout,
          signup,
          loggedIn,
          setLoggedIn,
        
          error,
          setError,
          addCategory,
          categories,
          addProfilePhoto,

          user,
          newUser,

          // addTweet,
          // deleteTweet,
          // editTweet,
          setNewUser,
          addNewTweet,
          deleteNewTweet,
          editNewTweet
          }}
        >
          { children }
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider }
