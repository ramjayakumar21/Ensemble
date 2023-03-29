const express = require("express")
const Artist = require('../models/artist')
const router = express.Router()

// All artists route
router.get('/', (req, res) => {
    res.render('artists/index')
})

// New artists route
router.get('/new', (req, res) => {
    res.render('artists/new', {artist: new Artist()})
})

// New artists route
router.get('/test', (req, res) => {
    res.json({data: "here is some data"})
})

// Create artist route
router.post('/', (req, res) => {
    res.send(req.body.name)
})


module.exports = router