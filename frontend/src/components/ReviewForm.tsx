import { useEffect, useContext, useState } from "react"
import axios from "axios";
import { ReviewContext } from "../pages/NewReview"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Avatar, Button, Input, Rating, Card, TextField, ButtonBase } from "@mui/material";
import { FastAverageColor } from "fast-average-color"
import "./ReviewForm.css"
import { color } from "@mui/system";
import { Navigate } from "react-router-dom";
import grad from "gradient-from-image";


export default function ReviewForm(props : any) {

    if (Object.keys(props.userData).length == 0){
        props.userData.rating = 0
        props.userData.reviewContent = ""
    }

    console.log("Review form props", props)

    const [reviewData, setReviewData] = useState<any>({...props.reviewData})
    const [rating, changeRating] = useState(props.userData.rating)
    const [reviewContent, changeReviewContent] = useState(props.userData.reviewContent)
    const [topTracks, setTopTracks] = useState([])

    let accessToken = localStorage.getItem("Authorization")

    useEffect(() => {
        initPage()
        

    }, [])

    
   
 
    function initPage() {
        // IMPLEMENT GRADIENT !!!
        // grad.gr(reviewData.images[0].url).then((gradient : any) =>{
        //     // this will gives you array of gradients
        //     //change this is to element css el.background="` linear-gradient(${gradient})`"
        //     console.log(gradient);
        // });

        
        
        axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
            headers: {
                  Authorization: `Bearer ${accessToken}`     
            },
            data: {
                time_range: "medium_term",
                limit: 50,
            }
        })
        .then(response => {
            if(response.status != 200){
              throw Error("Response Not Ok")
            }
              return response.data;
            })
        .then((res) => {
            console.log("user top tracks", res)
            let album_tracks = filterTracks(res.items, reviewData.id)
            console.log("tracks:", album_tracks)
            setTopTracks(album_tracks)
            let mins = getListenMinutes(album_tracks, reviewData.id)
            console.log("mins", mins)
        })

        
        
    }

    /**
     * Filters users top tracks for songs from album in reviewData
     */
    function filterTracks(tracks : object[], albumID : string): any {
        let filtered_tracks : object[] = tracks.filter((track : any) => {
            let trackAlbumID: string = track.album.id;
            return trackAlbumID == albumID;
        })
        
        
        return filtered_tracks

    }

    /**
     * Calculates total minutes listened in given track list of album
     */
    function getListenMinutes(tracks : object[], albumID : string): any {
        let total_mins : any = tracks.reduce((minSoFar, track : any) => {
            return (Math.round(track.duration_ms / 60000)) + minSoFar
        }, 0)
        
        console.log("fil", total_mins)
        return total_mins

    }

   

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
        console.log("redirect")


        return <Navigate replace to="/my-reviews"></Navigate>
    }
    

    console.log("Review Data", reviewData)
    console.log("User Data", props.userData)
    
    
    return (
        <div className={`review-form ${(!props.hidden) ? "hidden" : ""}`}>
            <div className="album-details">
                <img className="album-icon" style={{width: "45vh"}} alt={reviewData.name} src={reviewData.images[0].url} />
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
                    defaultValue={reviewContent}
                    variant="filled"
                    onChange={(event) => changeReviewContent(event.target.value)}
                />
            </div>
            <Button variant="contained" onClick={() => {sendReview()}}>Save</Button>
            <div>Favourite Track: </div>
            <div>Total Minutes Spent: </div>
        </div>
    )
    
}