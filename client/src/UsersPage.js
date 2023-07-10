import React, { useContext, useState } from "react";
import { UserContext } from './context/user'
import { Link } from "react-router-dom";

import TweetForm from "./TweetForm";

function UsersPage() {

    const { newUser, error } = useContext(UserContext)
    const [formFlag, setFormFlag] = useState(false)

    const closeTweetForm = () => {
        setFormFlag(false)
    }
console.log(newUser)
    const Tweet = ({body, id}) => (
        <article className="my-stuff">
          <Link to={`/tweets/${id}`}>
            {body}
            <br/>
          </Link>
        </article>
      )

      const Category = ({category, id}) => (
        <article className="my-stuff">
          <Link to={`/categories/${id}`}>
            {category}
          </Link>
        </article>
      )

    return (

        <div className="grid">
          <div>
            <h2 className="my-stuff">My Tweets</h2>
            {newUser.tweets?.map(t => <Tweet key={t.id} {...t} />)} 
  
            <br/>
            {formFlag ? <TweetForm closeTweetForm={closeTweetForm}/> : <button onClick={() => setFormFlag(true)} className="button">Add Tweet</button>}
            {formFlag ? null : error && <div className="button">{error}</div>}
          </div>
          <img className="my-stuff" src={newUser.profile_photo} alt="Your profile"></img>
          <div>
            <h2 className="my-stuff">My Categories</h2>
            {newUser.categories?.map(c => <Category key={c.id} {...c} />)}
          </div>
        </div>
        
      )
}
export default UsersPage