import React, { useState, useContext } from "react";
// import { useParams } from 'react-router-dom'
import { UserContext } from "./context/user";
import TweetForm from "./TweetForm";
import TweetLinks from "./TweetLinks";

function MyTweets() {
    const { loggedIn, user, error, tweetsAndCategories } = useContext(UserContext)
    const [formFlag, setFormFlag] = useState(false)
    // const params = useParams()

    const closeTweetForm = () => {
        setFormFlag(false)
    }

    console.log(user)

    if (loggedIn) {
        // let filterUsers = userTweets.filter(t => t.user.username === user.username)
        // let myFilteredTweets = user.tweets.filter(t => t.user.username === user.username)
        // console.log(filterUsers)
        // const filteredTweets = user.tweets.filter((tweet) => tweet.user.username === user.username);

        // const filteredTweets = user.tweets.filter(
        //     (tweet) => tweet.user.username == user.username
        //   );

        const filteredTweets = tweetsAndCategories.filter(
            (tweet) => tweet.user.username === user.username
          );

            const a = filteredTweets.map(tweet => <TweetLinks key={tweet.id} tweet={tweet} body={tweet.body} category={tweet.category.category} user={tweet.user.username}/>)
    return (
        // <div>
        //     <h3>{user.username}'s Tweets:</h3>
        //         {a}
        //     <br/>
        //     {formFlag ? <TweetForm closeTweetForm={closeTweetForm}/> : <button onClick={() => setFormFlag(true)}>Add Tweet</button>}
        //     {formFlag ?null : error && <div>{error}</div>}
        // </div>
        <div>
        <h3 className="button">Your Tweets</h3>
      {/* {filteredTweets.map((tweet) => (
        <div key={tweet.id}>
          <p>Tweet: {tweet.body} Category: {tweet.category.category} User: {tweet.user.username}</p>
        </div>
      ))} */}
      {a}

      <br/>
            {formFlag ? <TweetForm closeTweetForm={closeTweetForm}/> : <button onClick={() => setFormFlag(true)} className="button">Add Tweet</button>}
             {formFlag ?null : error && <div className="button">{error}</div>}
    </div>
    )
    } else {
        return (
        <h3>Not Authorized - Please Signup or Login</h3>
        )
    }
}
export default MyTweets