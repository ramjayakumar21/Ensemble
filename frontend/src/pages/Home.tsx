import { useState } from 'react'
import ReactDOM from "react-dom/client";
import "./Home.css"

export default function Home() {
    return (
        <div className='home'>
            
            <img className='banner' src='/pexels-vishnu-r-nair-1105666.jpg'></img>
            <h1>Welcome!</h1>
            <p>Welcome to Ensemble, a place to share your music opinions with friends! Feel free to sign into your account and add reviews!</p>
        </div>
    )
}

