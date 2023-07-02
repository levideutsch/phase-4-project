import React, { useContext } from "react";
import { UserContext } from "./context/user";

function NewHomePage() {

    const { categories } = useContext(UserContext)
// console.log(categories)


{/* <article className="button">
<a href="#" role="button" class="secondary"></a>

</article> */}

// const AllTweets = ({})

    return (



<div className="grid">
  <ul>
    {categories?.map(item => (
      item.tweets.map(tweet => {
        // debugger; // Debugger statement
        return (
          <article className="button" key={tweet.id}>
            <a href="#" role="button" className="secondary">
              {item.users.find(user => user.id === tweet.user_id)?.username}
            </a>
            <br />
            {tweet.body}
            <hr />
            {/* <a href="#" role="button" className="secondary">
              {categories.find(category => category.id === tweet.category_id)?.category}
            </a> */}
            <a href="#" role="button" className="secondary">
            Category: {item.category}
            </a>
            {/* {item.category} */}
          </article>
        );
      })
    ))}
  </ul>
</div>

    )
}

export default NewHomePage


