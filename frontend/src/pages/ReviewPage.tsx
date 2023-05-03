import { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client";
import axios from "axios"
import Review from '../components/ReviewWidget';
import { useParams, useLocation } from 'react-router-dom';
import "./ReviewPage.css"
import ReviewForm from '../components/ReviewForm';

export default function ReviewPage() {
    let params = useParams()

    const [userData, setUserData] = useState<any>({})
    const [reviewData, setReviewData] = useState<any>({})

    useEffect(() => {
        getReview()
    }, [])

    function getReview() {
        axios.get(`http://localhost:8010/reviews/${params.id}`)
        .then((res : any) => {
            console.log("data", res.data)
            let users_data = {
                rating: res.data.rating,
                reviewContent: res.data.content,
                id: params.id
            }

            axios.get(res.data.spotifyHref)
                .then((res : any) => {
                    console.log("data gotten from s", res)
                    setReviewData(res.data)

                })
                .catch((err) => {
                    console.error("error!:", err)
                })
            setUserData(users_data)
        })
        .catch((err) => {
            console.error(err)
        })
    }



    console.log("review data in review page", reviewData)
    console.log("user data in user page", userData)

    return (
        <div>
            {(reviewData.name == undefined) ? null :
            <ReviewForm isPOST={false} hidden={true} reviewData={reviewData} userData={userData}/>}
        </div>
    )
}

