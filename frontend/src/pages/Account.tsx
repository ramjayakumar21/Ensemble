import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { stringify } from "querystring";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Account.css";
import TextField from "@mui/material/TextField";

export default function Account() {
  const navigate = useNavigate();
  const params = useParams();

  const [authMethod, setAuthMethod] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("")

  const REDIRECT_URI = "http://localhost:5173/account";
  
  /**
   * Firebase Config Settings
   */
  const firebaseConfig = {
    apiKey: "AIzaSyDVPH4CdvYLJkitJy_QqZhqf5mn758T59Y",
    authDomain: "ensemble-a40ee.firebaseapp.com",
    projectId: "ensemble-a40ee",
    storageBucket: "ensemble-a40ee.appspot.com",
    messagingSenderId: "165596379782",
    appId: "1:165596379782:web:47ab2836acab29126eef07",
    measurementId: "G-PFYBB7V5HC",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    // checks if user has approved Spotify auth and gets/stores Authentication token in Storage
    handleSpotifyCode();
  });

  async function handleSpotifyCode() {
    let params: any = new URLSearchParams(window.location.search);

    
    if (params.get("code") === null) {
      return;
    }

    let codeVerifier: any = localStorage.getItem("code-verifier");
    let code = params.get("code");

    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: import.meta.env.VITE_CLIENT_ID,
      code_verifier: codeVerifier,
    });

    console.log("body", body);

    const response = fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("Authorization", data.access_token);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  // !!! TODO: Implement email and password checks
  /**
   * Handles user sign in with Firebase Auth.
   */
  async function handleSignIn() {
    try {
      console.log(email);
      let result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userCredential", JSON.stringify(result));
      location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Handles user sign up with Firebase Auth.
   */
  async function handleSignUp() {
    try {
      if (passwordRepeat != password) {
        window.alert("Passwords do not match!")
        return
      }
      let result = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userCredential", JSON.stringify(result));
      location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  function handleSignOut() {
    localStorage.removeItem("userCredential");
    localStorage.removeItem("code-verifier");
    location.reload();
  }

  /**
   * Generates request for Spotify Integration
   */
  async function linkSpotify() {
    let codeVerifier = generateRandomString(128);
    let codeChallenge: any = await generateCodeChallenge(codeVerifier);

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
        }),
      "_self"
    );
  }

  function generateRandomString(length: number) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier: string) {
    function base64encode(string: string) {
      return btoa(
        String.fromCharCode.apply(null, Array.from(new Uint8Array(digest)))
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest: any = await window.crypto.subtle.digest("SHA-256", data);

    return base64encode(digest);
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
      <div
        className="auth-form"
        style={{
          visibility: localStorage.getItem("userCredential")
            ? "hidden"
            : "visible",
        }}
      >
        <TextField
          id="sign-in-email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          label="Email"
          variant="filled"
        />
        <TextField
          id="sign-in-pass"
          type={"password"}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          label="Password"
          variant="filled"
        />
        {authMethod == "sign-in" ? (
          <>
            <button onClick={handleSignIn}>Sign In</button>
            <div>
              Don't have an account?
              <a onClick={() => setAuthMethod("sign-up")}>
                {" "}
                Click here to sign up
              </a>
            </div>
          </>
        ) : (
          <>
            <TextField
              id="sign-up-pass2"
              type={"password"}
              label="Verify Password"
              variant="filled"
              onChange={(event) => {
                setPasswordRepeat(event.target.value);
              }}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <div>
              Already have an account?
              <a onClick={() => setAuthMethod("sign-in")}>
                {" "}
                Click here to sign in
              </a>
            </div>
          </>
        )}
      </div>
      <div
        className="account-form"
        style={{
          visibility: localStorage.getItem("userCredential")
            ? "visible"
            : "hidden",
        }}
      >
        <button onClick={linkSpotify}>{(localStorage.getItem("Authentication")) ? "Spotify has been linked" : "Link Spotify"}</button>
        <button
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
