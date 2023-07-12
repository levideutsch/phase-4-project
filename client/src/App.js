import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from "./context/user";
import Signup from "./Signup";
import Login from "./Login";
import NavigationBar from "./NavigationBar";
import "./index.css"
import SingleTweet from "./SingleTweet";
import Categories from "./Categories";
import SingleCategory from "./SingleCategory";
import "@picocss/pico/css/pico.min.css";
import NotFound from "./NotFound";
import UsersProfilePage from "./UsersProfilePage";
import NewHomePage from "./NewHomePage";
import UsersPage from "./UsersPage";



function App() {

  const { loggedIn } = useContext(UserContext)

  if (!loggedIn) {
    return (
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route exact path="/" element={<NewHomePage/>}/>
        {/* <Route exact path="/tweets" element={<MyTweets/>}/> */}
        <Route exact path="/users-page" element={<UsersPage/>}/>
        <Route exact path="/tweets/:id" element={<SingleTweet/>}/>
        <Route exact path="/categories" element={<Categories/>}/>
        <Route exact path="/categories/:id" element={<SingleCategory/>}/>
        <Route exact path="/my-profile" element={<UsersProfilePage/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
