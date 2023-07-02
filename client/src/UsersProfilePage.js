import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

function UsersProfilePage() {
    const { user, loggedIn, addProfilePhoto } = useContext(UserContext)


    const [photoURL, setPhotoURL] = useState("");
    // console.log(photoURL)

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //       const response = await fetch('/profile-photo', {
    //         method: 'POST',
    //         body: JSON.stringify({ profile_photo: photoURL })
    //       });
    
    //       if (response.ok) {
    //         console.log('Profile photo added successfully');
    //         // Perform any additional actions on success
    //       } else {
    //         console.error('Error adding profile photo:', response.statusText);
    //         // Handle error cases
    //       }
    //     } catch (error) {
    //       console.error('Error adding profile photo:', error);
    //       // Handle error cases
    //     }
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        addProfilePhoto({id: user.id, profile_photo: photoURL})
        setPhotoURL("")
      };
    
    // console.log(photoURL)


// console.log(user)
    if (loggedIn) {
    return (
        <div>
       <div className="button">{user.username}'s Profile page</div> 
       <form className="button" onSubmit={handleSubmit}>
       <input
       placeholder="'Enter Image Url'"
       type="text"
       id="image"
       name="image"
       value={photoURL}
       onChange={(e) => setPhotoURL(e.target.value)}
       />
       <input type="submit" value="submit"/>
       </form>
       </div>
    )
    } else {
        return (
            <div className="error-container">
            <h3>Not Authorized - Please </h3>
            <div className="links-container">
              <Link to="/signup"><h3>Signup</h3></Link>
              <h3>Or</h3>
              <Link to="/login"><h3>Login</h3></Link>
            </div>
           </div>        
        )
    }
}
export default UsersProfilePage