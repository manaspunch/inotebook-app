const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "manasgood$boy123";
const fetchuser = require('../middleware/FetchUser');

// ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't require auth
try {
    router.post(
        '/CreateUser',
        // name should be 3 characters
        body('name', "Enter a valid name").isLength({ min: 3 }),
        // email must be an email
        body('email', 'Enter a valid email').isEmail(),
        // password must be at least 5 chars long
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
        async (req, res) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Check whether the user already exist or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Sorry, the user with same email id already exist' });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Create new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken: authToken });
        })
} catch (error) {
    console.error("Some internal server error occured..!");
    res.send(res.status(500).json(error));
}

// ROUTE 2: Authrnticate an user for login using: POST "/api/auth/login".No login required
router.post(
    '/Login',
    // email must be an email
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        let success = false;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ success, error: "Sorry invalid credentials entered for the user..!" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(401).json({ success, error: "Please enter valid credentials for the user..!" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, authtoken: authToken });
        } catch (error) {
            console.error("Some internal server error occured..!");
            res.send(res.status(500).json(error));
        }
    })

// ROUTE 3: Get loggedin user details using: POST "/api/auth/Getuser". Login required
router.post(
    '/GetUser', fetchuser, async (req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);

        } catch (error) {

        }
    })
module.exports = router
