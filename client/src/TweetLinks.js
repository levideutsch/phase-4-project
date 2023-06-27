import React from "react";
import { Link } from "react-router-dom";
// import { UserProvider } from "./context/user";
// import userEvent from "@testing-library/user-event";




function TweetLinks({ tweet }) {

    // const { userTweets } = UserProvider(UserProvider)


    // const { id } = useParams();
    // console.log(tweet)
    // return (
    // <div>
    // <Link to={`/tweets/${id}`}>
    // <p>{tweet.body}</p>
    // </Link>
    // </div>
       
    // )
    return (
        <div>
          <Link to={`/tweets/${tweet.id}`}>
            {/* <p>{tweet.body}</p> */}
            <article className="button">
              {tweet.body}
            </article>
          </Link>
        </div>
      );
}
export default TweetLinks