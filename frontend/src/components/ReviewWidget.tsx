import { Link } from "react-router-dom"
import "./ReviewWidget.css"

export default function Review(props: any)  {
    let { id, album, artist, rating } = props.reviewData

    return (
        <div className="review">
            <h1>{`${album} by ${artist}`}</h1>
            <h2>Has a rating of {rating} out of 10 and id {id}</h2>
            <Link to={`../review/${id}`}><button></button></Link>
        </div>
    )
}