import { useEffect, useContext, useState } from "react"
import axios from "axios";
import { ReviewContext } from "../pages/NewReview"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Avatar, Button, Input, Rating, Card, TextField, ButtonBase } from "@mui/material";
import { FastAverageColor } from "fast-average-color"
import "./ReviewForm.css"
import { color } from "@mui/system";


export default function ReviewForm(props : any) {
    const [rating, changeRating] = useState(0)
    const [reviewContent, changeReviewContent] = useState("default content")

    let reviewData = props.reviewData
    let accessToken = localStorage.getItem("Authorization")
    console.log("album data", props)
    
    console.log(reviewData.artists)
   
    // const fac = new FastAverageColor()
    // fac.getColorAsync((albumData.images[0].url))
    //     .then((color) => {
    //         let bg : any = document.getElementsByClassName("review-form")[0]
    //         // bg.style.backgroundColor = color.rgb
    //         // console.log(bg.style)
    //     })
    //     .catch((err) => {console.log(err)})

    fetch(`https://api.spotify.com/v1/albums/${reviewData.id}/tracks`, {
        method: "GET",
        headers: {
              Authorization: `Bearer ${accessToken}`     
        }
    })
    .then(response => {
        if(!response.ok){
          throw Error("Response Not Ok")
        }
          return response.json();
        })
    .then((res) => {
        console.log("res", res)
    })

    async function sendReview() {
        let artists = reviewData.artists.map((artist : any) => {return artist.name})

        let body =  {
            album: reviewData.name,
            artist: artists.join(", "),
            rating: rating,
            content: reviewContent,
            spotifyHref: reviewData.href
        }

        let result = await axios.post("http://localhost:8010/reviews/new", {
            data: body
        })
        console.log(result)
    }
    
    
    let component = (
        <div className={`review-form ${(!props.hidden) ? "hidden" : ""}`}>
            <div className="album-details">
                <img className="album-icon" alt={reviewData.name} src={reviewData.images[0].url} />
                <h1>{reviewData.name}</h1>
            </div>
            <div>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        if (newValue == null) newValue = 0;
                        changeRating(newValue)
                    }}
                    sx={{
                        fontSize: 80
                      }}
                />
                <TextField
                    id="filled-multiline-static"
                    label="Review Comments"
                    multiline
                    rows={6}
                    defaultValue=""
                    variant="filled"
                    onChange={(event) => changeReviewContent(event.target.value)}
                />
            </div>
            <Button variant="contained" onClick={() => {sendReview()}}>Save</Button>
        </div>
    )
    

    return component
}