const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const loginMid = require('../middleware/login');

const router = express.Router();
const User = require('../models/user')

const jwtSecret = require('../constants');

// function loggedIn(req, res, next) {
//     try {
//         const loginHeader = req.headers.authorization;
//         const token = jwt.verify(loginHeader, SECRET);
//         return next();
//     } catch (err) {
//         console.log(err.message);
//         return res.status(401).send('Unauthorized');
//     }
// }

// function correctUser(req, res, next) {
//     try {
//         const loginHeader = req.headers.authorization;
//         const token = jwt.verify(loginHeader, SECRET);
//         if (token.user === req.params.user)
//             return next();
//         else
//             return res.status(401).send('Unauthorized');
//     } catch (err) {
//         console.log(err.message);
//         return res.status(401),send('Unauthorized');
//     }
// }

router.get('/', correctUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch(e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
	let owner = false;
	try {
		if (req.params.id === req.user.id) {
			owner = true;
		}
		res.json(true);
	} catch (e) {
		console.error(e.message);
        res.status(500).send('Server Error');
	}
});

router.post('/sendEmail', async (req, res) => {

});

router.post('/recoverPassword', async (req, res) => {

});

router.posr('/resetPassword', async (req, res) => {

});

router.put('/confirm', async (req, res) => {

});

router.post('/', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').exists()
],
 async (req, res) => {
	const err = validationResult(req);
	
	if (!err.isEmpty()) {
		return res.status(400).send('Validation Error')
	}

    const { email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
			res.status(404).send('Invalid Username');
			return;
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
			if (!isMatch) {
				res.status(404).send('Invalid password');
			}
		})

		jwt.sign(
            { user: { id: user.id }},
            jwtSecret,
			{ expiresIn: 60 * 60 },
			(err, token) => {
				if (err) throw err;
				res.json({ userId: user.id, token});
		});
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;