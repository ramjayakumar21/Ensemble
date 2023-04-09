import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { Routes, Route, Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './pages/Home';
import Account from './pages/Account';
import MyReviews from './pages/MyReviews';
import ReviewPage from './pages/ReviewPage';
import { NewReview } from './pages/NewReview';

function App() {

  return (
    <div className="main-element">
      <div className="App">
        <div className="menu">
          <h1 className="menu--title">Ensemble</h1>
          <ul className='menu--buttons'>
            <Link to={"/"}><li>HOME</li></Link>
            <Link to={"my-reviews"}><li>MY REVIEWS</li></Link>
          </ul>
          <div className="account-icon">
            <Link to={"account"}><PersonIcon /></Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/my-reviews" element={<MyReviews />}/>
          <Route path="/account" element={<Account />}/>
          <Route path="/review/:id" element={<ReviewPage />}/>
          <Route path="/new-review" element={<NewReview />}/>
        </Routes>
      </div>
    </div>

  )
}




export default App
