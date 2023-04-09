import { useEffect, useContext, useState } from "react"
import { ReviewContext } from "../pages/NewReview"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Avatar, Button, Input, Rating, Card, TextField } from "@mui/material";
import { FastAverageColor } from "fast-average-color"
import "./ReviewForm.css"
import { color } from "@mui/system";


export default function ReviewForm(props : any) {
    const [rating, changeRating] = useState(0)

    let reviewData = props.reviewData
    let accessToken = localStorage.getItem("Authorization")
    console.log(reviewData)

    const fac = new FastAverageColor()
    fac.getColorAsync((reviewData.images[0].url))
        .then((color) => {
            let bg : any = document.getElementsByClassName("review-form")[0]
            // bg.style.backgroundColor = color.rgb
            // console.log(bg.style)
        })
        .catch((err) => {console.log(err)})

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

    
    

    return (
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
                    defaultValue="Default Value"
                    variant="filled"
                />
            </div>
        </div>
    )
}