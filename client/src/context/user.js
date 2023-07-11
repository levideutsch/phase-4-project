import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {

    const [error, setError] = useState([]);
    const [currentPage, setCurrentPage] = useState("");
   
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
        setError(error.errors)
      }
      getCategories() 
      await loadUser()
      setError([]) 
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
      setNewUser(newUser)//🟥
      setLoggedIn(true)
    }

    useEffect(() => {
      async function load() {
        getCategories();
        // ensure we don't load the user until we have the categories
        await loadUser();
      }
      load(); // call the async function as per the warning message
    }, [])

    const logout = () => {
      setCategories(null)
      setLoggedIn(false)
      setNewUser(null)
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
    }

    
    // async function getCategories() { setCategories(await fetch("/categories").then(res => res.json())) }
    

    function getCategories() {
      fetch("/categories")
      .then(response => {
        if (!response.ok) {
          response.json().then(err => {
            console.log(err.error)
            setError(err.error)
          })
        } else {
          response.json()
          .then(data => setCategories(data))
        }
      })
      
    }

    //////////////////////////////////////////////////

    function addNewTweet(newTweet) {
      fetch("/tweets", {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newTweet)
      })
      .then((response) => {
        if (!response.ok) {
          response.json().then((err) => { 
             console.log(Object.values(err))
             
            setError(Object.values(err));
            });
        } else {
          response.json().then((data) => {


           const findIfCategoryUserState = newUser.categories.find(c => c.category === data.category.category)

           if (!findIfCategoryUserState) {
            setNewUser({
              ...newUser,
              tweets: [data, ...newUser.tweets],
              categories: [{category: data.category.category, id: data.category.id}, ...newUser.categories] 
            })
           } else {
            setNewUser({
              ...newUser,
              tweets: [data, ...newUser.tweets]

            })
            setError(null)
          }
          

          setCategories(prevCategories => {
            return prevCategories.map(category => {
              if (category.id === data.category_id) {
                return {
                  ...category,
                  tweets: [
                    {
                      id: data.id,
                      body: data.body,
                      user_id: data.user_id,
                      category_id: data.category_id
                    },
                    ...category.tweets
                  ],
                  users: [
                    ...new Set([
                      {
                        id: data.user.id,
                        username: data.user.username
                      },
                      ...category.users
                    ])
                  ]
                };
              }
              return category;
            });
          });
        }
        );
      }
    })
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

    function addCategory(newCategory) {
      fetch("/categories", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newCategory)
      })
      .then(response => {
        if (!response.ok) {
          response.json().then(err => {
            console.log(err.errors)
            setError(err.errors)
          })
        } else {
          response.json().then(data => {
            setCategories(prevCategories => [data, ...prevCategories])
            setError(null)
          })
        }
      })
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
          setNewUser,
          addNewTweet,
          deleteNewTweet,
          editNewTweet,
          setCurrentPage
          }}
        >
          { children }
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider }
