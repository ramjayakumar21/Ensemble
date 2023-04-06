import { useEffect } from "react"
import SpotifySearch from "../components/SpotifySearch"

export default function NewReview() {
    let spotify_auth = localStorage.getItem("Authorization")



    return (
        <div>
            <SpotifySearch />
        </div>
    )
}