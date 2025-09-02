const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Signin Route
router.post('/Signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (!existing || existing.password !== password) {  
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.json({ success: true});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}); 

// Signup Route
router.post('/signup', async (req, res) => {
    const {email, password } = req.body;
    try {
            const existing = await User.findOne({ email });
        if (existing) {
            return res.json({ success: false, message: "User already exists" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.json({ success: true });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});



// User revoke
router.delete('/revoke', async (req, res) => {
    const { email } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (!existing) {
            return res.json({ success: false });
        }
        await User.deleteOne({ email });
        res.json({ success: true });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;


