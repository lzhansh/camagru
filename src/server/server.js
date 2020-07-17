const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
var path=require('path');

const app = express();
const db = require('../../config/keys').mongodbURI;
const PUBLIC_DIR = process.cwd() + '/dist';

const users = require('./routes/users');
const login = require('./routes/login');
const posts = require('./routes/posts');

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
app.use(bodyParser.urlencoded({extended: true }));

app.use(login);
app.use(users);
app.use(posts);
// app.use('/', (req, res) =>
	// { res.redirect('/'); });
	// console.log(__dirname);
const port = 5000;
app.use(express.static(PUBLIC_DIR));
app.get('*', (req, res) => {
	res.sendFile(path.join(process.cwd(), '/index.html'), (err) => {
		
	  if (err) {
		res.status(500).send(err)
	  }
	})
  })

app.listen(port, () => console.log(`App listening on port ${port}`));

