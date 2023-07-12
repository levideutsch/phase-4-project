import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function SingleTweet() {

  const [singleTweet, setSingleTweet] = useState(null)
  const [SingleCategory, setSingleCategory] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [tweetBody, setTweetBody] = useState("")
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isMyTweet, setIsMyTweet] = useState(true)
  const { deleteNewTweet, editNewTweet, newUser} = useContext(UserContext)
  const { id } = useParams()
  const navigate = useNavigate()


  // useEffect(() => {
  //   const tweet = categories
  //     .reduce((arr, category) => arr.concat(
  //       category.tweets.map(t => ({...t, category}))
  //     ), [])
  //     .find(tweet => tweet.id === parseInt(id));
  //     if (tweet === undefined || tweet.user_id !== newUser.id)
  //         setIsMyTweet(false)
  //     else 
  //     setIsMyTweet(true)
  //     setSingleTweet(tweet);
  //     setTweetBody(tweet ? tweet.body : '');
  // }, [id, showForm, categories]);

  useEffect(() => {
    const mySingleTweet = newUser?.tweets && newUser.tweets.find(tweet => tweet.id === parseInt(id));
    const mySingleTweetsCategory = newUser?.categories && 
    newUser.categories.find(category => category.id === mySingleTweet?.category_id)

    setSingleTweet(mySingleTweet)
    setSingleCategory(mySingleTweetsCategory)
    setTweetBody(mySingleTweet ? mySingleTweet.body : "")
  
    if (singleTweet === undefined || singleTweet?.user_id !== newUser?.id) {
      setIsMyTweet(false)
    } else {
      setIsMyTweet(true)
    }

  }, [id, newUser, singleTweet, SingleCategory, showForm])

  

  const handleForm = () => {
    setShowForm((showForm) => !showForm);
  }

  const handleEditClick = (e) => {
    setIsLoadingEdit(true);
    e.preventDefault()

    setTimeout(() => {
    setIsLoadingEdit(false);
    // editTweet({ ...singleTweet, body: tweetBody });
    editNewTweet({ ...singleTweet, body: tweetBody })
    setSingleTweet({ ...singleTweet, body: tweetBody})
    handleForm(false)
    }, 750);
  };

  const handleDeleteClick = () => {
    setIsLoadingDelete(true);

    setTimeout(() => {
      setIsLoadingDelete(false);
      //deleteTweet(singleTweet.id);
      deleteNewTweet(singleTweet.id)
      navigate('/users-page');
    }, 750);
  };

 

  if (!singleTweet || isMyTweet === false) {
    return <div className="button">Tweet not found. Go back</div>;
  }

  return (
    <div>

      <hgroup className="button">
        <h2>Tweet Details</h2>
        <h3>
          <Link to={`/categories/${SingleCategory?.id}`}>
            {SingleCategory?.category}
          </Link>
        </h3>
      </hgroup>
      <article className="button">
        {singleTweet?.body} || {newUser?.username}
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
          <button
          className="button"
          aria-busy={isLoadingEdit ? 'true' : 'false'}
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