import axios from "axios"
import "./Account.css"

export default function Account() {

    function generateRandomString(length : number) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }


    return (
        <div>
            <button onClick={() => {
                let codeVerifier = generateRandomString(128)
                localStorage.setItem('code-verifier', codeVerifier);
                let url = new URL("http://127.0.0.1:8010/login");
                url.searchParams.append("randomstr", codeVerifier)

                console.log(`/?randomstr=${codeVerifier}`)
                // location.href = `http://127.0.0.1:8010/login/?randomstr=${codeVerifier}`
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