import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleCategory() {

    const [singleCategory, setSingleCategory] = useState(null)
    const { id, loggedIn } = useParams()

    // console.log(singleCategory)

    useEffect(() => {
        fetch(`/categories/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.tweets[0].user.username)
    //    console.log(data.tweets?.map(item => item))
            const category = data.category.category;
            const tweets = data.tweets?.map(tweet => tweet)
            const username = data.tweets?.map(t => t.user.username)
            // console.log(username)
            // console.log(tweets)
            setSingleCategory({
                category: category,
                tweets: tweets,
                username: username
              });
        })
    }, [id])

    // const displayCategoryData = singleCategory.map(item => {
    //     console.log(item.category)
    // })

    // console.log(singleCategory.category)
    
    return (
        <div>
          {singleCategory ? (
            <>
              <h2 className="button">Category: {singleCategory.category}</h2>
              <br/>
              <h3 className="button">Tweets:</h3>
              <ul>
                {singleCategory.tweets.map((tweet) => (
                  // <li key={tweet.id}>Tweet: {tweet.body} User: {tweet.user.username}</li>
                  <article className="button" key={tweet.id}>
                    {tweet.body}
                    <br/>
                    User: {tweet.user.username}
                  </article>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
}
export default SingleCategory