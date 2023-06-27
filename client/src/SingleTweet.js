import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user";
import { useNavigate } from 'react-router-dom'



function SingleTweet() {

    const [singleTweet, setSingleTweet] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [tweetBody, setTweetBody] = useState("")
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);
    const { deleteTweet, editTweet, setError, error, loggedIn } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()

  
    // const handleDelete = () => {
    //     deleteTweet(singleTweet.id)
    //     navigate("/tweets")
    //     handleClick()
    // }

    const handleForm = () => {
        setShowForm((showForm) => !showForm);
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        editTweet({  id: singleTweet.id, body: tweetBody });
        setSingleTweet({ id: singleTweet.id, body: tweetBody})
        handleForm(false)
    }


    const handleEditClick = (e) => {
      setIsLoadingEdit(true);
      e.preventDefault()
  
 
      setTimeout(() => {
        
      setIsLoadingEdit(false);
      editTweet({  id: singleTweet.id, body: tweetBody });
      setSingleTweet({ id: singleTweet.id, body: tweetBody})
      handleForm(false)

      }, 750);
    };

    // useEffect(() => {
    //     fetch(`/tweets/${id}`)
    //     .then(res => res.json())
    //     .then(data =>  {
    //         // console.log(data)
    //         setSingleTweet(data)
    //         setTweetBody(data.body)
    //     })
    // }, [])

    useEffect(() => {
        fetch(`/tweets/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Error occurred while fetching the tweet.");
            }
            return res.json();
          })
          .then((data) => {
            setSingleTweet(data);
            setTweetBody(data.body);
          })
          .catch((error) => {
            // setError("An error occurred while fetching the tweet.");
            console.error(error);
          });
      }, []);


        const handleDeleteClick = () => {
          setIsLoadingDelete(true);
      
     
          setTimeout(() => {
            
            setIsLoadingDelete(false);
            deleteTweet(singleTweet.id);
            navigate('/tweets');

          }, 750);
        };


      if (loggedIn) {

    return (
        <div>
          {singleTweet ? (
            <div>
              {/* <h3>Tweet Details:</h3> */}
              {/* <p>{singleTweet.body}</p> */}
              <hgroup className="button">
              <h2>Tweet Details</h2>
              <h3></h3>
              </hgroup>
              <article className="button">
                {singleTweet.body}
              </article>
              <hr/>
              {/* <button className="button" onClick={handleDelete}>Delete</button> */}
              {/* <button aria-busy="true">Please wait…</button> */}
              {/* <button aria-busy="true" class="secondary"></button> */}
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
              {showForm ?  
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
                         </form> : null}
             
            </div>
          ) : (
            <div>Tweet not found.</div>
          )}
        </div>
      );
    } else {

    return (
         <h3>Not Authorized - Please Signup or Login</h3>
        )
    }
}
export default SingleTweet