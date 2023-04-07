import { useEffect, useContext, useState } from "react"
import { ReviewContext } from "../pages/NewReview"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Avatar, Button, Input } from "@mui/material";
import "./ReviewForm.css"


export default function ReviewForm(props : any) {
    let reviewDataProps : any = useContext(ReviewContext) 
    
    let reviewData = reviewDataProps.reviewData


    
    

    return (
        <div className={`review-form ${(!props.hidden) ? "hidden" : ""}`}>
            <Avatar alt={reviewData.name} src={reviewData.images[0].url} />
            <h1>{reviewData.name}</h1>
            <Input></Input>
            
            
  
        </div>
    )
}