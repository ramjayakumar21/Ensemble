const express = require("express")
const querystring = require('node:querystring');
const { createHash } = require('crypto');
const bodyParser = require("body-parser");
const crypto = require('crypto');

const router = express.Router()


let redirect_uri = "http://localhost:8010/success-login"

router.get('/login/:randomstr', async (req, res) => {
    const params = req.params
    console.log(params)
    let codeVerifier = req.params.randomstr

    let codeChallenge = await generateCodeChallenge(codeVerifier)

    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email app-remote-control';
    
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      }));

})


router.get('/login', async (req, res) => {

  const params = req.params
  res.send(params)
})


router.get('/success-login', (req, res) => {
    res.send(req.params)

})

router.get('/', (req, res) => {
    res.render('index') 
})

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


async function generateCodeChallenge() {
  function base64encode(string) {
    return Buffer.from(string).toString('base64');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.createHash('sha256').update(data).digest('hex');
  console.log(digest)

  return base64encode(digest);
}

module.exports = router