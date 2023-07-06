import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user";

function SingleCategory() {

  const { categories } = useContext(UserContext)
  const { id } = useParams()

  const category = categories.find(c => c.id === parseInt(id))

 
  if (!category)
    return <h3>Category Not Found</h3>

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
