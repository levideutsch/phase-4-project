import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

function NewHomePage() {

  const { categories } = useContext(UserContext)
console.log(categories)
  return (
    <div className="tweets">
      {categories?.map(category => (
        category?.tweets && category.tweets?.map(tweet => (
       <article className="button" key={tweet.id}>
            {tweet.body}
            <hr />
            <small>
            {category.users.find(user => user.id === tweet.user_id)?.username}
            {' | '}
            <Link to={`/categories/${tweet.category_id}`}>
              {category.category}
            </Link>
            </small>
          </article>
        ))
        ))}
    </div>
  )
}

export default NewHomePage
