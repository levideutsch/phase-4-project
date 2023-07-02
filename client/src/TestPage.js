import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

function TestPage() {
    const { tweets } = useContext(UserContext)
    // console.log(tweets)
    // Get all tweets from categories, and not from user

    const Tweet = ({ user, category, body }) => (
      <article className="button">
        <a href="#" role="button" class="secondary">{user.username}</a>
        <br/>
        {body}
        <hr/>
        {/* <p>Category: {category.category}</p> */}
        <Link to={`categories/${category.id}`}>
          <a href="#" role="button" class="secondary">Category: {category.category}</a>
        </Link>
        {/* <p>User: {tweet.user.username}</p> */}
      </article>
    )

    return (
      <div className="grid">
        <ul>
          {tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
        </ul>
      </div>
    )
}
export default TestPage
