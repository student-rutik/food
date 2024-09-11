const express=require("express");
const router=express.Router();
const User=require("../models/Useschema");
const { body, validationResult } = require('express-validator');

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwrSecret="mynamerutikandimahonestboy#"



router.post("/createuser",[
    body('email',"valid email").isEmail(),
    body('password',"password prob").isLength({ min: 5 }),
    body('name',"name prob").isLength({ min: 3 })
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }


 const salt=await bcrypt.genSalt(10);
 const secPassword=await bcrypt.hash(req.body.password,salt);



    try {
        await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:secPassword
        })
        res.json({success:true})
    } 
    catch (error) {
        console.log(error);
        res.json({success:false})
        
    }
})






router.post("/loginuser", [
    body('email', "valid email").isEmail(),
    body('password', "password must be at least 5 characters").isLength({ min: 5 }),
],
    async (req, res) => {

        // Validate incoming request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            // Find the user by email
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Please login with correct email" });
            }

            // Compare the password
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {  // Change this condition to check for wrong password
                return res.status(400).json({ errors: "Please login with correct password" });
            }

            // Prepare payload for JWT
            const data = {
                user: {
                    id: userData.id
                }
            }

            // Generate the JWT token
            const authToken = jwt.sign(data, jwrSecret);

            // Send the success response with the token
            return res.json({ success: true, authToken: authToken });
        }

        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });

module.exports=router;