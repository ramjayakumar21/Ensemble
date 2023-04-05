import axios from "axios"
import { useState, useEffect } from 'react'
import "./Account.css"

export default function Account() {

    useEffect(() => {
        getAuthorizationCode()
    }, [])

    const getAuthorizationCode = () => {
        axios.get("http://localhost:8010/get-access-token")
        .then((res : any) => {
            // console.log(res.data)
            if ("error" in res.data){
                console.log('hasnt signed in')
            } else {
                localStorage.setItem("Authorization", res.data.Authorization)
            }
            
        })
    }


    return (
        <div>
            <button onClick={() => {
                location.href = "http://localhost:8010/login"
            }}>Sign into Spotify</button>
            <button onClick={async () => {
                let result = await axios.post("http://localhost:8010/reviews/new", {
                    data: {
                        album: 'MBTDF3',
                        artist: "Kanye1",
                        rating: 102,
                        id: 427,
                    }
                })
                console.log(result)
            }}>
                Click me!!
            </button>
        </div>
    )
}