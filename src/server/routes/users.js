const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const loginMid = require('../middleware/login');

const router = express.Router();
const User = require('../models/user');
// const Post = require("../models/post");

// const saltRounds = 10;

router.get('/', loginMid, async (req, res) => {
	// User.find().then(users => res.json(users))

	try {
		const user = await User.findOne({_id: req.user.id});
		if (!profile) {
			return res.status(400).send('This user does not exist');
		}
		res.json(user);
	} catch (e) {
		console.log(e.message);
		res.status(500).send('Server Error');
	}
});

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password should have 8 or more characters').isLength({ min: 8 })
],
async (req, res) => {
	const err = validationResult(req);
	
	if (!err.isEmpty()) {
		return res.status(400).send('Validation Error')
	}

	const {name, email, password} = req.body;

	try {
		let newUser = await User.findOne({email});
		if (newUser) {
			res.status(400).send('Email exists');
			return ;
		}

		newUser = new User({
			name,
			email,
			password
		});

		bcrypt.hash(password, saltRounds, (err, hash) => {
			if (err) {
				res.status(404).send(err);
			} else {
				newUser.password = hash;
			}
		});
		newUser.save().then(user => res.json(user))
	} catch (e) {
		console.error(e.message);
		res.status(500).send(e.message);
	}
	// const newUser = new User({
	// 	name: req.body.name
	// });
	// newUser.save().then(user => res.json(user))
});

router.post('/login', loginMid, async (req, res) => {
	let user = await User.findById(req.user.id);
	const password = req.body;

	if (!user) {
		res.status(401).send('User does not exist');
	} else {
		try {
			if (user && password) {
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (isMatch) {
						res.json(user);
					} else {
						res.status(404).send('Invalid password')
					}
				})
			} else {
				res.status(401).send('Invalid');
			}
		} catch (e) {
			console.error(e.message);
			res.status(500).send('Server Error');
		}
	}
});

router.put('/', loginMid, async (req, res) => {
	try {
		let user = await User.findById(req.user.id);
		const {name, email, newPassword} = req.body;

		if (newPassword) {
			bcrypt.hash(newPassword, saltRounds, (err, hash) => {
				user.password = hash;
			});
		} else if (name) {
			user.name = name;
		} else if (email) {
			const isExist = User.findOne({email});
			if (!isExist) {
				user.email = email;
			} else {
				res.status(400).send('Email exists');
				return ;
			}
		}
		user.save().then(user => res.json(user));
	} catch (e) {
		res.status(500).send('Server Error');
	}
	// User.findById(req.params.id)
	// 	.then(user => { user.updateOne({$set: {"name": req.body.name}})
	// 		.then(() => res.json({success: true}))
	// 		.catch(err => res.status(404).json({success: false}))
	// 	})
});

router.delete('/:id', loginMid, (req, res) => {
	User.findById(req.params.id)        
	  .then(user => {            
		user.remove()                
		.then(() => res.json({ success: true }))                
		// return 404 if not found                
		.catch(err => res.status(404).json({ success: false }) )    
	  }) 
  });

module.exports = router;