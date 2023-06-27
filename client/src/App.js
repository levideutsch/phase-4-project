import React from "react";
// import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import { UserProvider } from "./context/user";
import Signup from "./Signup";
import Login from "./Login";
import NavigationBar from "./NavigationBar";
import Tweets from "./MyTweets";
import "./index.css"
import SingleTweet from "./SingleTweet";
import Categories from "./Categories";
import SingleCategory from "./SingleCategory";
// import TestPage from "./TestPage";
import "@picocss/pico/css/pico.min.css";
import NotFound from "./NotFound";
import UsersProfilePage from "./UsersProfilePage";





function App(props) {


  return (
    <UserProvider>
      <Router>
      <NavigationBar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/tweets" element={<Tweets/>}/>
        <Route exact path="/tweets/:id" element={<SingleTweet/>}/>
        <Route exact path="/categories" element={<Categories/>}/>
        <Route exact path="/categories/:id" element={<SingleCategory/>}/>
        <Route exact path="/my-profile" element={<UsersProfilePage/>}/>
        {/* <Route exact path="/tweets" element={<TestPage/>}/> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Router>
    </UserProvider>
  )
}

export default App;
