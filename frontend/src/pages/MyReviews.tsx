import { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client";
import axios from "axios"
import Review from '../components/Review';

export default function MyReviews() {
    const [data, changeData] = useState<any>([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get("http://localhost:8010/reviews/all")
        .then((res : any) => {
            console.log(res.data)
            changeData(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return (
        <div className='home'>
            {(data.length == 0) ? <h1>Loading...</h1> : data.map((elem : any) => {
                return <Review reviewData={elem} key={elem._id}/>
            })
            }
        </div>
    )
}

