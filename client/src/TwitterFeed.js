import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

function TwitterFeed() {
    const { user } = useContext(UserContext)

    return (
        <div>
            {user.tweets.map(t =>
            <li key={t.id}>
                {t.body} User: {t.user.username} ~~ Category: {t.category.category}
            </li>)}
        </div>
    )
}
export default TwitterFeed