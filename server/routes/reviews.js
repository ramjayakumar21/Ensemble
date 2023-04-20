const express = require('express')
const router = express.Router()
const Review = require("../models/reviews")

router.post('/new', async (req, res) => {
    const body = req.body.data
    if (req.body.id == undefined) {
        let latestReview = await Review.find().sort({id:-1}).limit(1)
        console.log(latestReview[0].id)
        body.id = latestReview[0].id + 1
    }

    console.log(body)

    const review = new Review({
        id: body.id,
        album: body.album,
        artist: body.artist,
        rating: body.rating,
        content: body.content,
        spotifyHref: body.spotifyHref
    })

    try {
        let newReview = await review.save()
        res.send(`Made a new review for ${body.album} - ${body.artist}`)
    } catch(e) {
        console.log(e)
        res.status(501).send("Failed to make a new review!")
       

    }
})

router.get('/new', async (req, res) => {
    res.send("/reviews/new is here")
})

router.get('/all', async (req, res) => {
    try {
        let output = await Review.find()
        return res.send(output)
    } catch {
        res.status(404).send("Failed to get all artists!")
    }
})

router.get('/:id', async (req, res) => {
    try { 
        let output = await Review.findOne({id: Number(req.params.id)})
        res.send(output)
    } catch {
        res.status(500).send("Failed to get all artists!")

    }
})




module.exports = router