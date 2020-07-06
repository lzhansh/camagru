const express = require("express");
const { check, validationResult } = require("express-validator");
const loginMid = require('../middleware/login');

const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.get('/all', async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

router.post('/', loginMid, (req, res) => {
	try {
		let post = await Post.findOne({ image: req.file.id });
		if (post) {
			return res.error({ error: 'Duplicate image'});
		}
		post = new Post({
			user: req.user.id,
			image: req.file.id
		});
		post.save().then(post => res.json(post))
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

router.get('/image/:id', (req, res) => {
	try {
		res.contentType = 'image/png';
		const id = a;
	} catch (e) {

	}
});