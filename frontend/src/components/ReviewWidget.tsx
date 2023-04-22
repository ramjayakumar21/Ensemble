import { Link } from "react-router-dom"
import "./ReviewWidget.css"

export default function Review(props: any)  {
    console.log("propsss", import.meta.env.VITE_SECRET_KEY)
    let { id, album, artist, rating, spotifyHref } = props.reviewData

    async function initReview() {
        let res = await fetch(spotifyHref,{
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`     
            }})

        try {
            // res.body.json()
        } catch {

        }
        console.log()
    }
    
    
    initReview()

    return (
        <div className="review">
            <img src={spotifyHref} ></img>
            <h1>{`${album} by ${artist}`}</h1>
            <h2>Has a rating of {rating} out of 10 and id {id}</h2>
            <Link to={`../review/${id}`}><button></button></Link>
        </div>
    )
}