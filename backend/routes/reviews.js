const express = require('express')
const router = express.Router()
const Review = require("../models/reviews")
const reviews = require('../models/reviews')

router.post('/new', async (req, res) => {
    const body = req.body.data
    if (req.body.id == undefined) {
        try {
            let latestReview = await Review.find().sort({id:-1}).limit(1)
            console.log(latestReview[0].id)
            body.id = latestReview[0].id + 1
        } catch {
            body.id = 1
        }
        
    }

    console.log("body", body)

    const review = new Review({
        id: body.id,
        album: body.album,
        artist: body.artist,
        rating: body.rating,
        content: body.content,
        spotifyHref: body.spotifyHref,
        userID: body.userID
    })

    console.log("review", review)

    try {
        let array = await Review.find({spotifyHref: body.spotifyHref, userID: body.userID})
        console.log(array.length)
        if (array.length != 0 ) {
            console.log("already exists")
            res.status(401).send(`Already have a review for this album!`)
        } else {
            let newReview = await review.save()
            console.log("made a review")
            res.send(`Made a new review for ${body.album} - ${body.artist}`)
        }
        
    } catch(e) {
        console.log("error", e)
        res.status(500).send("Failed to make a new review!")
       

    }
})

router.put("/new", async (req, res) => {
    console.log("PUT REQUEST: ", req.body)
    const query = { id: req.body.data.id };
    const updates = {
        $set: { ...req.body.data }
    };
    console.log("query", query)
    
    try {
        let find = await Review.find(query);
        let result = await Review.updateOne(query, updates);
        res.send(result).status(200);
    } catch(e) {
        console.log(e)
        res.status(500).send("Failed to update a review!")
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
        res.status(500).send("Failed to get all artists!")
    }
})

router.get('/user/:userID', async (req, res) => {
    try {
        console.log("made request for user reviews", req.params.userID)
        let output =  await Review.find({userID: req.params.userID})
        console.log("output:", output)
        return res.send(output)
    } catch {
        res.status(500).send(`Failed to get reviews for user id: ${req.params.userID}`)
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