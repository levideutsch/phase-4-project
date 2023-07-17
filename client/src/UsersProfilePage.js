import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";

function UsersProfilePage() {
  const { newUser, setNewUser } = useContext(UserContext);
  const [photoURL, setPhotoURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProfilePhoto({ id: newUser.id, profile_photo: photoURL });
    setPhotoURL("");
  };

  async function addProfilePhoto(user) {
    try {
          const response = await fetch(`/users/${user.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ profile_photo: user.profile_photo })
          });
          const updatedUser = await response.json();
          updateUser(updatedUser);
      } catch (error) {
          console.error(error);
      }
  }

  const updateUser = (updatedUser) => {
    setNewUser(prevUser => {
      if (prevUser.id === updatedUser.id) {
        return {
          ...prevUser,
          profile_photo: updatedUser.profile_photo
        };
      }
      return prevUser;
    });
  };

  return (
    <div>
      {/* <div className="button">{newUser.username}'s Profile page</div>  */}
      <p className="button">{newUser.profile_photo ? "Update Profile Photo" : "Add Profile Photo"}</p>
      <form className="button" onSubmit={handleSubmit}>
        <input
          placeholder="Enter Image Url"
          type="text"
          id="image"
          name="image"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UsersProfilePage;