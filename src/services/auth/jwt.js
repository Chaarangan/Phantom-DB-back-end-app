const ApiError = require('../../helpers/ApiError');
const sequelize = require("../../helpers/sequelizer");
const jwt = require("jsonwebtoken");
const config = require("../../config/index");


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    else{
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.userId = decoded.id;
            next();
        });
    }
};

const isAdmin = (req, res, next) => {
    sequelize.query("SELECT * FROM admins WHERE employee_id = ?", {replacements : [req.userId]}).then(
        async (foundUser) => {
            if (foundUser[0].length == 0) {
                return res.status(403).json({ response : "Require Admin Role!" });                                               
            }
            else{
                next();
                return;
            }
    });
};


const isManager = (req, res, next) => {
    sequelize.query("SELECT * FROM managers WHERE employee_id = ?", {replacements : [req.userId]}).then(
        async (foundUser) => {
            if (foundUser[0].length == 0) {
                return res.status(403).json({ response : "Require Manager Role!" });                                               
            }
            else{
                next();
                return;
            }
    });
};

const isClerk = (req, res, next) => {
    sequelize.query("SELECT * FROM clerks WHERE employee_id = ?", {replacements : [req.userId]}).then(
        async (foundUser) => {
            if (foundUser[0].length == 0) {
                return res.status(403).json({ response : "Require Clerk Role!" });                                               
            }
            else{
                next();
                return;
            }
    });
};


const isCustomer = (req, res, next) => {
    sequelize.query("SELECT * FROM customers WHERE customer_id = ?", {replacements : [req.userId]}).then(
        async (foundUser) => {
            if (foundUser[0].length == 0) {
                return res.status(403).json({ response : "Require Customer Role!" });                                               
            }
            else{
                next();
                return;
            }
    });
};


module.exports = { verifyToken, isAdmin, isManager, isClerk, isCustomer };