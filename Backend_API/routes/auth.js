const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')


// Create a User using: POST "/api/auth/". Doesn't require auth
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
        console.log(user);
        if (user) {
            return res.status(400).json({ error: 'Sorry, the user with same email id already exist' });
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        res.json(user);
    })



module.exports = router
