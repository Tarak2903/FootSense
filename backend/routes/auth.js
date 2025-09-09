const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const bcrypt=require('bcryptjs')
const cookieparser=require('cookie-parser');
// Signin Route
router.post('/Signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (!existing ) {  
            return res.status(401).json({ success: false, message: "User doesnt exist" });
        }
        const isValid= await bcrypt.compare(password,existing.password)

        if(!isValid){
            return res.status(401).json({success:false,message:"Invalid password"});    
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
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser = new User({ email, password:hashedPassword });
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


