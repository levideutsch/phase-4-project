import React, { useState, useContext } from "react";
// import { useParams } from 'react-router-dom'
import { UserContext } from "./context/user";
import TweetForm from "./TweetForm";
// import TweetLinks from "./TweetLinks";
import { Link } from "react-router-dom";

function MyTweets() {
    const { user, error } = useContext(UserContext)
    const [formFlag, setFormFlag] = useState(false)
    // const params = useParams()

    const closeTweetForm = () => {
        setFormFlag(false)
    }

    // console.log(user.profile_photo)
    console.log(error)

    const Tweet = ({body, id}) => (
      <article className="my-stuff">
        <Link to={`/tweets/${id}`}>
          {body}
          <br/>
        </Link>
        {/* <p>User: {tweet.user.username}</p> */}
      </article>
    )

    const Category = ({category, id}) => (
      <article className="my-stuff">
        <Link to={`/categories/${id}`}>
          {category}
        </Link>
        {/* <p>User: {tweet.user.username}</p> */}
      </article>
    )

    return (
      <div className="grid">
        <div>
          <h2 className="my-stuff">My Tweets</h2>
          {user.tweets.map(t => <Tweet key={t.id} {...t} />)}

          <br/>
          {formFlag ? <TweetForm closeTweetForm={closeTweetForm}/> : <button onClick={() => setFormFlag(true)} className="button">Add Tweet</button>}
          {formFlag ? null : error && <div className="button">{error}</div>}
        </div>
        <img className="my-stuff" src={user.profile_photo} alt="Your profile"></img>
        <div>
          <h2 className="my-stuff">My Categories</h2>
          {user.categories.map(c => <Category key={c.id} {...c} />)}
        </div>
      </div>
    )
}
export default MyTweets


/* 

soomething.map(a => <Child key={a.key}> a={a})


funciton Child({a})
*/
