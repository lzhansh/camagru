const mongoose = require('mongoose');
const express = require("express");
// const bodyParser = require("body-parser");

const app = express();
const db = require('../../config/keys').mongodbURI;
// const PUBLIC_DIR = process.cwd() + '/dist';

// const users = require('./routes/users');
const login = require('./routes/login');
const post = require('./routes/posts');

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

app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true }));

app.use(login);
// app.use('/users', users);
app.use(post);
// app.use('/', (req, res) =>
	// { res.redirect('/'); });

const port = 3000;
// app.use(express.static(PUBLIC_DIR));

app.listen(port, () => console.log(`App listening on port ${port}`));

