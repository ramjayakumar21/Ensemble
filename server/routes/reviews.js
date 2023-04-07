const express = require('express')
const router = express.Router()
const Review = require("../models/reviews")

router.post('/new', async (req, res) => {
    const body = req.body.data
    const review = new Review({
        id: body.id,
        album: body.album,
        artist: body.artist,
        rating: body.rating,
    })

    try {
        let newReview = await review.save()
        res.send(`Made a new review for ${body.album} - ${body.artist}`)
    } catch(e) {
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
        res.sendStatus(404).send("Failed to get all artists!")

    }
})

router.get('/:id', async (req, res) => {
    try { 
        let output = await Review.findOne({id: Number(req.params.id)})
        res.send(output)
    } catch {
        res.sendStatus(500).send("Failed to get all artists!")

    }
})


module.exports = router