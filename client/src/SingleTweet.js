import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function SingleTweet() {

  const [singleTweet, setSingleTweet] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [tweetBody, setTweetBody] = useState("")
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isMyTweet, setIsMyTweet] = useState(true)
  const { deleteTweet, editTweet, categories, user} = useContext(UserContext)
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    const tweet = categories
      // get tweets from all categories
      .reduce((arr, category) => arr.concat(
        // add the category to the tweet objects we are going to search through
        category.tweets.map(t => ({...t, category}))
      ), [])
      // now search by the tweet id
      .find(tweet => tweet.id === parseInt(id));

       
      // Check if tweet is undefined or doesn't match the current users ID     
      if (tweet === undefined || tweet.user_id !== user.id)
          setIsMyTweet(false)
      else 
      setIsMyTweet(true)

      setSingleTweet(tweet);
      setTweetBody(tweet ? tweet.body : '');

  }, [id, showForm, categories]);


  const handleForm = () => {
    setShowForm((showForm) => !showForm);
  }

  // Function that allows user to edit single tweet
  const handleEditClick = (e) => {
    setIsLoadingEdit(true);
    e.preventDefault()

    setTimeout(() => {
      
    setIsLoadingEdit(false);
    editTweet({ ...singleTweet, body: tweetBody });
    setSingleTweet({ ...singleTweet, body: tweetBody})
    handleForm(false)

    }, 750);
  };

  // Function to delete single tweet 
  const handleDeleteClick = () => {
    setIsLoadingDelete(true);

    setTimeout(() => {
      setIsLoadingDelete(false);
      deleteTweet(singleTweet.id);
      navigate('/tweets');

    }, 750);
  };

  // If singleTweet does not exist and the tweet does not belong to user do this:
  if (!singleTweet || isMyTweet == false) {
    return <div className="button">Tweet not found.</div>;
  }


  return (
    <div>
      <hgroup className="button">
        <h2>Tweet Details</h2>
        <h3>
          <Link to={`/categories/${singleTweet.category_id}`}>
            {singleTweet.category.category}
          </Link>
        </h3>
      </hgroup>
      <article className="button">
        {singleTweet.body} || {user.username}
      </article>
      <hr/>
      <button
        className="button"
        aria-busy={isLoadingDelete ? 'true' : 'false'}
        onClick={handleDeleteClick}
        disabled={isLoadingDelete}
      >
        {isLoadingDelete ? 'Loading...' : 'Delete'}
      </button>
      <br/>
      <button className="button" onClick={handleForm}>Edit</button>
      {showForm &&
        <form className="button" onSubmit={handleEditClick}>
          <input
              type="text"
              name="body"
              autoComplete="off"
              value={tweetBody}
              onChange={e => setTweetBody(e.target.value)}
          />
          {/* <input type="submit" value="save" /> */}
          <button
            className="button"
            aria-busy={isLoadingEdit ? 'true' : 'false'}
            // onClick={handleDeleteClick}
            type="submit"
            disabled={isLoadingEdit}
              >
            {isLoadingDelete ? 'Loading...' : 'Save'}
          </button>
        </form>
      }
    </div>
  );
}
export default SingleTweet