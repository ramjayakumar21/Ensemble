import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Skeleton } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import ReviewWidget from "../components/ReviewWidget";

export default function MyReviews() {
  const [reviewList, changeReviewList] = useState<any>([]);

  useEffect(() => {
    if (localStorage.getItem("userCredential") != null) {
      let userCredential = localStorage.getItem("userCredential")
      let userData = null
      if (userCredential != null) {
        userData = JSON.parse(userCredential)
      }
      getAllReviews(userData.user.uid)
    }
  }, []);

  function getAllReviews(userID : any){
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/reviews/user/" + userID)
      .then((res: any) => {
        console.log(res.data);
        changeReviewList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="reviews">
      <div className="reviews--new-review">
        <button>
          <Link to={"/new-review"}>Add new</Link>
        </button>
      </div>
      {reviewList.map((elem: any) => {
        return <ReviewWidget reviewData={elem} key={elem._id} />;
      })}
    </div>
  );
}
