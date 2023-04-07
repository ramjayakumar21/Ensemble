import { useEffect, createContext, useState } from "react"
import SpotifySearch from "../components/SpotifySearch"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ReviewForm from "../components/ReviewForm"
import { Button } from "@mui/material";
import "./NewReview.css"

export const ReviewContext = createContext({})
export const ReviewContextUpdater = createContext({})

export function NewReview() {

    const [reviewData, setReviewData] = useState({
        name: "",
        artists: [""],
        images: [""]
    })
    const [spotifySearchHidden, setSpotifySearchHidden] = useState(false)

    let states = {
                reviewData, setReviewData, 
                spotifySearchHidden, setSpotifySearchHidden
            }
    

    

    return (
            <ReviewContext.Provider value={states}>
                <div>
                    <SpotifySearch hidden={spotifySearchHidden}/>
                    {reviewData.name}
                    <Button variant="contained" 
                        disabled={(reviewData.name == "") ? true : false} 
                        onClick={() => {
                        setSpotifySearchHidden(true)
                        }}>
                            Next
                    </Button>
                    <ReviewForm hidden={spotifySearchHidden}/>
                </div>
            </ReviewContext.Provider>
    )
}