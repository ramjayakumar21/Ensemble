import axios from "axios"
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { stringify } from "querystring";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Account.css"
import TextField from "@mui/material/TextField";

export default function Account() {
    const navigate = useNavigate()
    const params = useParams()
    const [authMethod, setAuthMethod] = useState("sign-in")
    const [email, setEmail] = useState("")

    const REDIRECT_URI = "http://localhost:5173/account"
    
    const [password, setPassword] = useState("")


    const firebaseConfig = {
        apiKey: "AIzaSyDVPH4CdvYLJkitJy_QqZhqf5mn758T59Y",
        authDomain: "ensemble-a40ee.firebaseapp.com",
        projectId: "ensemble-a40ee",
        storageBucket: "ensemble-a40ee.appspot.com",
        messagingSenderId: "165596379782",
        appId: "1:165596379782:web:47ab2836acab29126eef07",
        measurementId: "G-PFYBB7V5HC"
    };
      
    const app = initializeApp(firebaseConfig);

    const auth = getAuth();

    
    

    useEffect(() => {
        handleSpotifyCode()
        

        })

    async function handleSpotifyCode() {
        let params : any = new URLSearchParams(window.location.search);

        if (params.get("code") === undefined) {
            return 
        }

        let codeVerifier = localStorage.getItem("code-verifier")
        let code = params.get("code")

        let body = stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: import.meta.env.VITE_CLIENT_ID,
            code_verifier: codeVerifier,
          });
        
        try {
            let result : any = await axios.post('https://accounts.spotify.com/api/token', body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            localStorage.setItem('access_token', result.access_token);
        } catch(e) {
            console.error(e)
            
        }
        
    }


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

    // !!! TODO: Implement email and password checks
    /**
     * Handles user sign in with Firebase Auth.
     */
    async function handleSignIn() {
        try {
            console.log(email)
            let result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem("userCredential", JSON.stringify(result))
        } catch(e) {
            console.error(e)
        }
    }

    /**
     * Handles user sign up with Firebase Auth.
     */
    async function handleSignUp() {
        try {
            console.log(email)
            let result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem("userCredential", JSON.stringify(result))
            navigate("")
        } catch(e) {
            console.error(e)
        }
    }

    /**
     * Generates request for Spotify Integration
     */
    async function linkSpotify() {
        let codeVerifier = generateRandomString(128);
        let codeChallenge : any = await generateCodeChallenge(codeVerifier);
        
      
        let state = generateRandomString(16);
        let scope = "user-top-read user-read-playback-position";
      
        localStorage.setItem("code-verifier", codeVerifier);
      
        window.open(
          "https://accounts.spotify.com/authorize?" +
            stringify({
              response_type: "code",
              client_id: import.meta.env.VITE_CLIENT_ID,
              scope: scope,
              redirect_uri: REDIRECT_URI,
              state: state,
              code_challenge_method: "S256",
              code_challenge: codeChallenge,
            })
            ,'_self');

        

        
    }

    function generateRandomString(length : any) {
        let text = "";
        let possible =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    
    function sha256(plain : any) {
        // returns promise ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest("SHA-256", data);
      }
      
      function base64urlencode(a : any) {
        var str = "";
        var bytes = new Uint8Array(a);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          str += String.fromCharCode(bytes[i]);
        }
        return btoa(str)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
      }
      
      async function generateCodeChallenge(v : any) {
        var hashed = await sha256(v);
        console.log
        var base64encoded = base64urlencode(hashed);
        return base64encoded
      }
        
    // createUserWithEmailAndPassword(auth, "rameyland21@gmail.com", "password123")
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log("user!! ", user)
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("error", error)
    //     // ..
    //   });


    return (
        <div>
            <div className="auth-form" style={{visibility: (localStorage.getItem("userCredential")) ? "hidden" : "visible"}}>
                    <TextField id="sign-in-email" onChange={(event) => {
                            setEmail(event.target.value)
                        }} 
                        label="Email" variant="filled" />
                    <TextField id="sign-in-pass" type={"password"} 
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }} 
                        label="Password" variant="filled" />
                {(authMethod == "sign-in") ? 
                (<>
                    <button onClick={handleSignUp}>Sign In</button>
                    <div>Don't have an account?<a onClick={() => setAuthMethod("sign-up")}> Click here to sign up</a></div>
                </>) : 
                (<>
                    <TextField id="sign-up-pass2" type={"password"} label="Verify Password" variant="filled" />
                    <button>Sign Up</button>
                    <div>Already have an account?<a onClick={() => setAuthMethod("sign-in")}> Click here to sign in</a></div>
                </>) 
                }
            </div>
            <div className="account-form" style={{visibility: (localStorage.getItem("userCredential")) ? "visible" : "hidden"}}>
                <button onClick={linkSpotify}>Link Spotify
                </button>
                <button onClick={() => {
                    localStorage.removeItem("userCredential")
                    localStorage.removeItem("code-verifier")
                    navigate("")
                }}>Sign Out
                </button>
            </div>
        </div>
    )
}