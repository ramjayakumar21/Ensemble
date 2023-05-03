const express = require('express')
const User = require('../models/users')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Tried to access users page")
})

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    })

    try {
        const newUser = await user.save()
        res.status(200).redirect("http://localhost:5173")
    } catch {
        res.status(404).send("Creating new user failed")
    }
})





module.exports = router