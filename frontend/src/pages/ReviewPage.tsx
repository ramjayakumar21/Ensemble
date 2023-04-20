import { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client";
import axios from "axios"
import Review from '../components/ReviewWidget';
import { useParams, useLocation } from 'react-router-dom';
import "./ReviewPage.css"

export default function ReviewPage() {
    let params = useParams()

    const [review, changeReview] = useState<any>({})

    useEffect(() => {
        getReview()
    }, [])

    const getReview = () => {
        axios.get(`http://localhost:8010/reviews/${params.id}`)
        .then((res : any) => {
            console.log(res.data)
            changeReview(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }



    return (
        <div>
            {JSON.stringify(review)}
        </div>
    )
}

