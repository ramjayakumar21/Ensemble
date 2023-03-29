const express = require("express")
const router = express.Router()
const querystring = require('node:querystring');



router.get('/login', async (req, res) => {
    let state = "fda07fli7rtfdbfi";
    let scope = 'user-read-private user-read-email';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: "http://127.0.0.1:5173/",
        state: state
      }));

})

router.get('/', (req, res) => {
    res.render('index') 
})

module.exports = router