const express = require('express');
const CryptoJS = require('crypto-js')

const User = require('../models/User');

const router = express.Router();
router.get("/", (req, res) => {
    res.status(200)
    res.end("HI")
});

router.post("/create", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.DES.encrypt(req.body.password, process.env.HASH_SECRET)
        });
        const savedUser = await newUser.save();

        const {password,__v, ...info} = savedUser._doc;
    
        res.status(200).json({
            message:"User saved successfully",
            data: info
        })
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/allUsers", async(req, res) => {
    try {
    const users = await User.find();

    res.status(200).json({
        message:"List of All Users",
        data: users
    })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router