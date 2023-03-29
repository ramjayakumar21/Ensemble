import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { Routes, Route, Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './pages/Home';
import Account from './pages/Account';
import MyReviews from './pages/MyReviews';
import ReviewPage from './pages/ReviewPage';

function App() {

  return (
    <div className="main-element">
      <div className="App">
        <div className="menu">
          <h1 className="menu--title">Ensemble</h1>
          <ul className='menu--buttons'>
            <li><Link to={"/"}>HOME</Link></li>
            <li><Link to={"my-reviews"}>MY REVIEWS</Link></li>
            <li><Link to={"account"}>ACCOUNT</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/my-reviews" element={<MyReviews />}/>
          <Route path="/account" element={<Account />}/>
          <Route path="/review/:id" element={<ReviewPage />}/>
        </Routes>
      </div>
    </div>

  )
}




export default App
