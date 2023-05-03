const express = require("express");
const querystring = require("node:querystring");
const crypto = require("crypto");
const sha256 = require('sha256');
const store = require("store");
const axios = require("axios")

const router = express.Router();


let redirect_uri = "http://localhost:8010/success-login";

router.get("/login", async (req, res) => {
  let codeVerifier = generateRandomString(128);
  let codeChallenge = await generateCodeChallenge(codeVerifier);

  let state = generateRandomString(16);
  let scope =
    "user-top-read user-read-playback-position";

  store.set("code-verifier", codeVerifier);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      })
  );

  
});

router.get("/success-login", async (req, res) => {
  let code = null
  try {
    code = req.query.code
  } catch {
    res.send("Failed to get code")
  } 

  if (code == null) res.sendStatus(504)

  codeVerifier = store.get("code-verifier");  

  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
    client_id: process.env.CLIENT_ID,
    code_verifier: codeVerifier,
  });

  axios.post('https://accounts.spotify.com/api/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      if (response.status != 200) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.data;
    })
    .then(data => {
      store.set('access_token', data.access_token);
      res.redirect('http://localhost:5173/account')
    })
    .catch(error => {
       console.error('Error:', error);
    });
  

});

router.get('/get-access-token', (req, res) => {
    let result = store.get("access_token")
    if (result == null) {
        res.json({error: "Not allowed to get code!"})
    } else {
        store.set('access_token', null);
        res.json({Authorization: result})
    }

})

router.get("/get-profile", async (req, res) => {
  let accessToken = store.get('access_token');
  
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    let data = await response.data;
    res.send(data)
})

router.get("/", (req, res) => {
  res.render("index");
});

function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
const generateCodeChallenge = async (codeVerifier) => {
  const base64encode = (str) => {
    const buffer = Buffer.from(str, 'binary');
    return buffer.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const data = Buffer.from(codeVerifier, 'binary');
  const digest = await crypto.createHash('sha256').update(data).digest('binary');
  const codeChallenge = base64encode(digest);

  return codeChallenge;
}

module.exports = router;
