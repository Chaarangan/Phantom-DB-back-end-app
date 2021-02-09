const config = require('./config');
const loaders = require('./loaders');
const express = require('express');
const routes = require('./api');
const apiErrorHandler = require('./helpers/apiErrorHandler');

async function startServer() {

    const app = express();

    await loaders({ expressApp: app });
    
    //handle routes
    routes.endPointsHandler(app);

    //Error handling middleware
    app.use(apiErrorHandler);

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));
    app.use(express.json());
    var session = require('express-session');
    app.use(require("express-session")({
        secret:"Charangan",
        resave:true,
        saveUninitialized:false
    }));
    
    app.listen(config.port, err => {
        if (err) {
        console.log(err);
        return;
        }
        console.log(`Your server is ready on port ${config.port}`);
    });
}

startServer();