import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";
import FormOnHomePage from "./FormOnHomePage";

function NewHomePage() {

  const { categories } = useContext(UserContext)
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleForm = () => {
    setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
  };

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

        <button className="fixed-button" onClick={handleForm}>
              {/* <img src={buttonImg} alt="Button" /> */}
            </button>
            {isFormOpen && (
              <div className="form-container">
                <FormOnHomePage isFormOpen={setIsFormOpen} />
              </div>
            )}

    </div>
  )
}

export default NewHomePage
