import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";

function UsersProfilePage() {
    const { user, addProfilePhoto } = useContext(UserContext)
    const [photoURL, setPhotoURL] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        addProfilePhoto({id: user.id, profile_photo: photoURL})
        setPhotoURL("")
    };

    return (
    <div>
        <div className="button">{user.username}'s Profile page</div> 
        <form className="button" onSubmit={handleSubmit}>
            <input
                placeholder="Enter Image Url"
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
}

export default UsersProfilePage