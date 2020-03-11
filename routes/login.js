const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = 'Token secret';

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

function correctUser(req, res, next) {
    try {
        const loginHeader = req.headers.authorization;
        const token = jwt.verify(loginHeader, SECRET);
        if (token.user === req.params.user)
            return next();
        else
            return res.status(401).send('Unauthorized');
    } catch (err) {
        console.log(err.message);
        return res.status(401),send('Unauthorized');
    }
}

router.get('/', correctUser, async (req, res) => {
    try {
        const findUser = await User.findById(req.user.id);
        res.json(findUser);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [
    
],
 async (req, res) => {
    const {id, password} = req.body;
    try {
        const findUser = await User.findOne({ id });
        if (!findUser) {
            return res.status(404).send('Invalid Username');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch === false) {
            return res.status(404).send('Invalid Password');
        }

        const token = jwt.sign(
            { user: { id: user.id }},
            SECRET,
            { expiresIn: 60 * 60 }
        );
        return res.json({token});
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;