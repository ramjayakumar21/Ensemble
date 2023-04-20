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

    let content = null

    if (reviewData.name !== "") {
        console.log(reviewData)
        console.log('REview data not undefined')
        content = <ReviewForm hidden={spotifySearchHidden} reviewData={reviewData}/>
    }
    

    

    return (
            <ReviewContext.Provider value={states}>
                <div>
                    <div className={`page-1 ${(spotifySearchHidden) ? "hidden" : ""}`}>
                        <SpotifySearch hidden={spotifySearchHidden}/>
                        {reviewData.name}
                        <Button variant="contained" 
                        disabled={(reviewData.name == "") ? true : false} 
                        onClick={() => {
                        setSpotifySearchHidden(true)
                        setReviewData(reviewData)
                        }}>
                            Next
                        </Button>
                    </div>

                    <div className={`page-2 ${(!spotifySearchHidden) ? "hidden" : ""}`}>
                        <Button variant="contained" 
                        disabled={(reviewData.name == "") ? true : false} 
                        onClick={() => {
                        setSpotifySearchHidden(false)
                        }}>
                            Back
                        </Button>
                        {
                         content
                        } 
                        
                    </div>

                    
                    
                </div>
            </ReviewContext.Provider>
    )
}