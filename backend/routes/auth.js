const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs')
const cookieparser = require('cookie-parser');


// MiddleWare function
const verifyToken = async (req, res, next) => {
    const token = req.cookies.tarakcookie;
    
    if (!token) {
        return res.status(401).json({ success: false })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.email = decoded;
        next();

    }
    catch (err) {
        return res.status(401).json({ success: false, message: err.message })
    }
   
}

// Signin Route
router.post('/Signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (!existing) {
            return res.status(401).json({ success: false, message: "User doesnt exist" });
        }
        const isValid = await bcrypt.compare(password, existing.password)

        if (!isValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign({
            email
        },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.cookie('tarakcookie', token, {
            maxAge: 24 * 1000 * 60 * 60,
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        })
        console.log("Hello puneet bhai")
        res.json({ success: true });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Signup Route

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.json({ success: true });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});
 //Middleware apply
 router.get('/Verify',verifyToken,async (req,res)=>{
    return res.status(200).json({success:true,message:"Verified"});
 })


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


