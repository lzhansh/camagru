const express = require("express");
// const { check, validationResult } = require("express-validator");
const loginMid = require('../middleware/login');

const router = express.Router();
// const User = require('../models/user');
const Post = require('../models/post');

router.get('/allposts', (req, res) => {
	Post.find()
	.populate("postedBy", "_id name")
	.then(posts => {
		res.json({posts});
	})
	.catch(e => {
		console.log(e);
	})
})

router.post('/createpost', loginMid, (req, res) => {
	const  {title, body} = req.body;
	if (!title || !body) {
		res.status(422).json({error: "Please, fill up all the fields"});
	}
	req.user.password = undefined;
	const post = new Post({
		title,
		body,
		postedBy: req.user
	})

	post.save()
	.then(result => {
		res.json({post: result})
	}).catch(e => {
		console.log(e);
	})
})

router.get('/mypost', loginMid, (req, res) => {
	Post.find({postedBy: req.user._id})
	.populate("postedBy", "_id name")
	.then(post => {
		res.json({post});
	})
	.catch(e => {
		console.log(e);
	})
})
// router.get('/all', async (req, res) => {
// 	try {
// 		const posts = await Post.find().sort({ date: -1 });
// 		res.json(posts);
// 	} catch (e) {
// 		console.error(e.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// router.post('/', loginMid, (req, res) => {
// 	try {
// 		let post = await Post.findOne({ image: req.file.id });
// 		if (post) {
// 			return res.error({ error: 'Duplicate image'});
// 		}
// 		post = new Post({
// 			user: req.user.id,
// 			image: req.file.id
// 		});
// 		post.save().then(post => res.json(post))
// 	} catch (e) {
// 		console.error(e.message);
// 		res.status(500).send('Server Error');
// 	}
// });

module.exports = router