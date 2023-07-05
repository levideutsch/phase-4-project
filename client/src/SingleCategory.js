import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user";

function SingleCategory() {

  const { categories } = useContext(UserContext)
  const { id } = useParams()

  // Finding the category that matches 4000/categories/:id
  const category = categories.find(c => c.id === parseInt(id))

  // If the category does exist
  if (!category)
    return <h3>Category Not Found</h3>

  // Return it along with its associated tweet and its tweets user  
  return (
    <div>
      <h2 className="button">
        Category: {category.category}
      </h2>
      <br/>
      <h3 className="button">Tweets:</h3>
      {category.tweets?.map((tweet) => {
        const user = category.users.find((user) => user.id === tweet.user_id);
        return (
          <div>
            <article className="button" key={tweet.id}>
              {tweet.body}
              <br/>
              User: {user?.username || ''}
            </article>
          </div>
        );
      })}
    </div>
  );
}

export default SingleCategory
