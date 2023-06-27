import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

function TwitterFeed() {
    const { userTweets, loggedIn, user } = useContext(UserContext)

// console.log(userTweets)
    if (loggedIn) {
        // let filterUsers = userTweets.filter(t => t.user.username === user.username)
        // console.log(filterUsers)

        const tweetsList = userTweets.map(t => <li key={t.id}>{t.body} User: {t.user.username} ~~ Category: {t.category.category}  </li>)
        // console.log(tweetsList)
        // console.log(userTweets)
    return (
        <div>
                {tweetsList}
        </div>
    )
    } else {
        return (
        <h3>Not Authorized - Please Signup or Login</h3>
        )
    }
}
export default TwitterFeed