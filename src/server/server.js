const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");

const users = require('./routes/users');
// const login = require('./routes/login');
// const login = require('./routes/posts');

const db = require('../../config/keys').mongodbURI;
const PUBLIC_DIR = process.cwd() + '/dist';
const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({extended: true }));

mongoose.connect(db, {
	            useNewUrlParser: true,
	            useCreateIndex: true,
	            useFindAndModify: false, 
	            useUnifiedTopology: true
	        }).then(() => console.log('DB connected'))
			.catch((err) => console.log('DB error', err));

// if (process.env.NODE_ENV === 'production') { 
// 	app.enable('trust proxy'); 
// 	app.use((req, res, next) => { 
// 		if (req.secure) next();
// 		else res.redirect(`https://'${req.headers.host}${req.url}`);
// 	});
// 	} 
app.use('/users', users);
// app.use('/login', login);
// app.use('/posts', posts);
// app.use('/', (req, res) =>
	// { res.redirect('/'); });

const port = process.env.PORT || 3000;
app.use(express.static(PUBLIC_DIR));

app.listen(port, () => console.log(`App listening on port ${port}`));

