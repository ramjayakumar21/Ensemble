import { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios"
import ReviewWidget from '../components/ReviewWidget';

export default function MyReviews() {
    const [reviewList, changeReviewList] = useState<any>([])

    useEffect(() => {
        getAllReviews()
    }, [])

    const getAllReviews = () => {
        axios.get("http://localhost:8010/reviews/all")
        .then((res : any) => {
            console.log(res.data)
            changeReviewList(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return (
        <div className='reviews'>
            <div className='reviews--new-review'>
                <button><Link to={"/new-review"}>Add new</Link></button>
            </div>
            {(reviewList.length == 0) ? <h1>Loading...</h1> : reviewList.map((elem : any) => {
                return <ReviewWidget reviewData={elem} key={elem._id}/>
            })}
        </div>
    )
}

