import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleCategory() {

    const [isLoading, setIsLoading] = useState(false)
    const [singleCategory, setSingleCategory] = useState(null)
    const { id, loggedIn } = useParams()

    // console.log(singleCategory)

    useEffect(async () => {
        setIsLoading(true)
        const data = await fetch(`/categories/${id}`).then(res => res.json())

        const category = data.category?.category;
        const tweets = data.tweets?.map(tweet => tweet)
        const username = data.tweets?.map(t => t.user.username)

        if (category) {
          setSingleCategory({
            category: category,
            tweets: tweets,
            username: username
          });
        } else {
          setSingleCategory(null)
        }

        setIsLoading(false)
    }, [id])

    // const displayCategoryData = singleCategory.map(item => {
    //     console.log(item.category)
    // })

    // console.log(singleCategory.category)
   
    return (
        <div>
          {isLoading
            ? <p>Loading...</p>
            : singleCategory ? (
              <div>
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
              </div>
            ) : <p>Category Not Found</p>}
        </div>
      );
}
export default SingleCategory