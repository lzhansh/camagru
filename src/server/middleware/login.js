const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {jwtSecret} = require("../../../config/keys");
const User = require('../models/user');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "You must be logged In" });
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, jwtSecret, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "You must be logged In" });
		}
		const { _id } = payload;
		User.findById(_id).then((userdata) => {
			req.user = userdata;
			next();
		});
	});
};