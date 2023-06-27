import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

function TestPage() {
    const { user, loggedIn, tweetsAndCategories } = useContext(UserContext)
    // console.log(tweetsAndCategories)

    // const tweets = user.map(u => <li key={u.tweets.id}>{user.tweets.body}</li>)

    // const b = user.tweets[0].body
    // console.log(b)


    //    const blah =  user.map((tweet) => (
    //     <div key={tweet.id}>
    //       <p>Body: {tweet.body}</p>
    //       <p>Category: {tweet.category.category}</p>
    //       <p>User: {tweet.user.username}</p>
    //     </div>
    //   ))

    if (loggedIn) {

    // function displayTweets() {
    // if (user.tweets && user.tweets.length > 0) {
    //     return user.tweets.map(tweet => <li key={tweet.id}>Tweet: {tweet.body}  Category: {tweet.category.category} User: {tweet.user.username}</li>)
    //   } else {
    //     console.log("No tweets available.");
    //   }
    // }

    // function displayTweets() {
    //     if (user && user.tweets && user.tweets.length > 0) {
    //       return user.tweets.map(tweet => (
    //         <li key={tweet.id}>
    //           Tweet: {tweet.body} 
    //           Category: {tweet.category ? tweet.category.category : "N/A"}
    //           User: {tweet.user ? tweet.user.username : "N/A"}
    //         </li>
    //       ));
    //     } else {
    //       console.log("No tweets available.");
    //     }
    //   }

    

    return (
        <div>
            
    {/* {displayTweets()} */}
    {tweetsAndCategories?.map(tweet => (
  // <li key={tweet.id}>
  //   Tweet: {tweet.body}
  //   Category: {tweet.category.category}
  //   User: {tweet.user.username}
  // </li>
<ul key={tweet.id}>
{/* <a href="#" role="button" class="secondary">User: {tweet.user.username}</a> */}

<article className="button">
<a href="#" role="button" class="secondary">{tweet.user.username}</a>
<br/>
{/* <header>Tweet</header> */}
{tweet.body}
<hr/>

{/* <p>Category: {tweet.category.category}</p> */}
<a href="#" role="button" class="secondary">Category: {tweet.category.category}</a>
{/* <p>User: {tweet.user.username}</p> */}

</article>
</ul>
))}
{/* <meta name="twitter:card" content="summary"> yes</meta> */}
  
      </div>
    )
} else {
    return (
        <div className="error-container">
        <h3>Not Authorized - Please </h3>
        <div className="links-container">
          <Link to="/signup"><h3>Signup</h3></Link>
          <h3>Or</h3>
          <Link to="/login"><h3>Login</h3></Link>
        </div>
       </div>        
       )
    }
}
export default TestPage
