import { Link } from "react-router-dom"
import "./ReviewWidget.css"
import { useState } from "react"

export default function Review(props: any)  {
    let { id, album, artist, rating, spotifyHref } = props.reviewData
    const [spotifyData, setSpotifyData] = useState<any>({})


    let accessToken = localStorage.getItem("Authorization")

    async function initReview() {
        let response = await fetch(spotifyHref, {
            headers: {
                Authorization: `Bearer ${accessToken}`     
            }})
        try {
            if(!response.ok){
                throw Error("Response Not Ok")
            }
            let res = await response.json();
            let imageurl = res.images[0].url
            setSpotifyData((oldData : any) => {
                return {imageURL: imageurl, ...oldData}
            })

        } catch(e) {
            console.error(e)
        }
        
        
        
    }
    
    
    initReview()

    return (
        <div className="review">
            <img style={{width: "30vh"}}src={spotifyData.imageURL} ></img>
            <h1 className="review--album-title">{`${album} by ${artist}`}</h1>
            <h2>Has a rating of {rating} out of 10 and id {id}</h2>
            <Link to={`../review/${id}`}><button>See More</button></Link>
        </div>
    )
}