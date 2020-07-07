const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { check, validationResult } = require('express-validator');
const loginMid = require('../middleware/login');

const router = express.Router();
const User = require('../models/user')
const saltRounds = 10;
const {jwtSecret} = require('../../../config/keys');
const { route } = require("./users");

// router.get('/', async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         res.json(user);
//     } catch(e) {
//         console.error(e.message);
//         res.status(500).send('Server Error');
//     }
// });

// router.get('/', (req, res) => {
// 	res.send('hello');
// })

// router.get('/protected', loginMid, (req, res) => {
// 	res.send('hello user');
// })

router.post('/signup', (req, res) => {
	const {name, email, password} = req.body;
	if (!email || !password || !name) {
		return res.status(422).json({error: "Please fill up all the fields"});
	}
	User.findOne({email: email})
	.then((userExists) => {
		if (userExists){
			return res.status(422).json({error: 'Email already exists'})
		}
		
		bcrypt.hash(password, saltRounds, (err, hash)=> {
			if (err) {
				res.status(404).send(err);
			} else {
				const user = new User({
					name,
					email,
					password: hash
				})

				user.save()
				.then(user => {
					res.json({message: "success"});
				})
			}
		});
	})
	.catch(err => {
		console.log(err);
	})
})

router.post('/signin', (req, res) => {
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(422).json({error: 'Please, fill up email/password field'});
	}
	User.findOne({email: email})
	.then(user => {
		if (!user){
			return res.status(422).json({error: 'Invalid email/password'});
		}
		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (isMatch) {
				// res.json({message: 'Succesfully signed in'});
				const token = jwt.sign({_id: user._id}, jwtSecret);
				res.json({token});
			} else {
				res.status(422).json({error: 'Invalid email/password'});
			}
		})
	})
	.catch(err => {
		console.log(err);
	})
})

// router.get('/:id', async (req, res) => {
// 	let owner = false;
// 	try {
// 		if (req.params.id === req.user.id) {
// 			owner = true;
// 		}
// 		res.json(true);
// 	} catch (e) {
// 		console.error(e.message);
//         res.status(500).send('Server Error');
// 	}
// });

// router.post('/sendEmail', async (req, res) => {

// });

// router.post('/recoverPassword', async (req, res) => {

// });

// router.post('/resetPassword', async (req, res) => {

// });

// router.put('/confirm', async (req, res) => {

// });

// router.post('/', [
//     check('email', 'Invalid email').isEmail(),
//     check('password', 'Password is required').exists()
// ],
//  async (req, res) => {
// 	const err = validationResult(req);
	
// 	if (!err.isEmpty()) {
// 		return res.status(400).send('Validation Error')
// 	}

//     const { email, password} = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
// 			res.status(404).send('Invalid Username');
// 			return;
//         }

//         bcrypt.compare(password, user.password, (err, isMatch) => {
// 			if (!isMatch) {
// 				res.status(404).send('Invalid password');
// 			}
// 		})

// 		jwt.sign(
//             { user: { id: user.id }},
//             jwtSecret,
// 			{ expiresIn: 60 * 60 },
// 			(err, token) => {
// 				if (err) throw err;
// 				res.json({ userId: user.id, token});
// 		});
//     } catch (err) {
//         console.log(err.message);
//         return res.status(500).send('Server Error');
//     }
// });

module.exports = router;