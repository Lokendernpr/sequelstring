const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const USer = require("../models/User");

// upload document role A

router.post("/upload", authMiddleware, roleMiddleware("RoleA"),
async (req, res)=> {
    try {
        res.json({msg: 'Document Uploaded'});
    }catch (error){
        console.error(error.message);
        res.status(500).send("server error");
    }
} 
);

// approve docs

router.post("/approve", authMiddleware, roleMiddleware("RoleB"),
async (req, res)=> {
    try {
        res.json({msg: 'Document approved'});
    }catch (error){
        console.error(error.message);
        res.status(500).send("server error");
    }
} 
);


module.exports = router;