const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");
const connectDB = require('./config/db');
const morgan = require("morgan"); //morgan is a middleware that allows us to easily log requests,
                                //errors, and more to the console.

connectDB();
const app = express();
const PORT = 8000;

app.use(morgan("tiny"));
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: true})); //returns a function that acts as middleware.
                                                //The function listens for req.on(‘data’) and constructs
                                                //req.body from the chunks of data it gets.

app.get("/", (req, res, next) => {
    res.send('Success')
});

/* Routes */
app.use('/users', require('./routes/users'));
// app.use('/users', require('./routes/users'));
// app.use('/users', require('./routes/users'));
// app.use('/users', require('./routes/users'));

/* Error handling */
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    return next(err); //catch 404 and forward to error handler
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.render("error", {
        message: err.message,
        error: app.get("env") === "development" ? err : {}
    });
});

/* Server */
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});