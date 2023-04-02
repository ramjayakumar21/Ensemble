import axios from "axios"
import "./Account.css"

export default function Account() {


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