const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const User = require("../models/User");

// USer Register

router.post('/register', async (req , res) => {
    const {username, password, role } = req.body;

    try {
        let user = await User.findOne({username});
        
        if(user){
            return res.status(400).json({msg: "User already exits"});
        }

        user = new User({
            username,
            password,
            role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };
       
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 3600},
            (error , token) => {
                if(error) throw error;
                res.json({token});
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Servor Error");
    }
});

// LOGIN

router.post("/login" , async (req, res) =>{
    const {username, password} = req.body;

    try {
        let user = await User.findOne({username});

        if (!user){
            return res.status(400).json({msg: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return  res.status(400).json({msg: "Invalid Credentials"});
        }

        const payload = {
            user:{
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 3600},
            (error , token) => {
                if(error) throw error;
                res.json({token});
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Servor Error");
    }
    });

    // get authenticated useer

router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("server Error");
    }
});

module.exports = router
    
