const bluebird = require('bluebird');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


//
const apiError = require("./utils/Error/apiError");
const { globalErrHandler } = require("./utils/Error/globalErrHandle");

// access environment variables
require('dotenv').config();

// import utils
const respond = require('./libraries/respond');
const logger = require('./libraries/logger');

// import API Routes
const eventApiV1 = require('./domains/event/v1/api');

// db start & configs
try {
    mongoose.Promise = bluebird;
    let isConnectedBefore = false;
    let connect = function () {
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
        });
    };
    connect();
    mongoose.connection.on('error', function () {
        logger.info('Could not connect to MongoDB');
    });
    mongoose.connection.on('disconnected', function () {
        logger.info('Lost MongoDB connection...');
        if (!isConnectedBefore) connect();
    });
    mongoose.connection.on('connected', function () {
        isConnectedBefore = true;
        logger.info('Connection established to MongoDB');
    });
    mongoose.connection.on('reconnected', function () {
        logger.info('Reconnected to MongoDB');
    });

    // Close the Mongoose connection, when receiving SIGINT
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            logger.info('Force to close the MongoDB conection');
            process.exit(0);
        });
    });
} catch (err) {
    throw err;
}

// app middleware
const app = express();
// app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(cors());

//Set Routes
const userRouters = require("./domains/users/v1/api");
const authRouters = require("./domains/auth/v1/api");
const categoryRouters = require("./domains/category/v1/api");
const postRouters = require("./domains/post/v1/api");
const commentRouters = require("./domains/comment/v1/api")
const eventRouters = require("./domains/event/v1/api")
const programRouters = require("./domains/program/v1/api")
const lessonRouters = require("./domains/lessons/v1/api")

// Use Routes
app.use("/api/users", userRouters);
app.use("/api/auth", authRouters);
app.use("/api/categories", categoryRouters);
app.use("/api/posts", postRouters);
app.use("/api/comments", commentRouters);
app.use("/api/events", eventRouters);
app.use("/api/programs", programRouters);
app.use("/api/lesson", lessonRouters);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    logger.info("NOT FOUND!");
    respond.responseNotFound(res);
});

// error handler
app.use(function (err, req, res, next) {
    logger.info(err);
    respond.responseError(res);
});

// finalize
module.exports = app;

// listen
const port = process.env.PORT
app.listen(port, function() {
    console.log(`Server is running in port : ${ port }`)
})
