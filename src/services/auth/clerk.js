const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const bcrypt=require("bcrypt");
const config = require("../../config/index");
var jwt = require("jsonwebtoken");
const date = require('date-and-time');
const now = new Date();

const login = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employee_logins WHERE username = ?", {replacements: [req.body.username]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {
                        const   employee_id = foundUser[0][0].employee_id,
                                password = foundUser[0][0].password;
                        
                        if (!(await bcrypt.compare(req.body.password, password))) {
                            res.status(401).json({ status: "error", response: 'Incorrect Password!'});
                        }
                        else{
                            await sequelize.query("SELECT * FROM clerks WHERE employee_id = ?", {replacements: [employee_id]}).then(
                                async (foundUser) => {
                                    if (foundUser[0].length != 0) {
                                        var token = jwt.sign({ user: foundUser[0][0] }, config.secret, {
                                            expiresIn: 86400 // 24 hours
                                        });
                                        req.accessToken = token;
                                        req.foundUser = foundUser[0][0];
                                        req.message = "Sucessfully Logged In!";
                                        next();                                               
                                    }
                                    else{
                                        return res.status(404).json({ response : "No Clerk found with this username!" });
                                    }
                                                    
                                }
                            );
                        }                                
                    }
                    catch (e){
                        console.log(e);
                        next(ApiError.badRequest());
                    }
                }
                else {
                    return res.status(404).json({ response : "No Clerk found with this username!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};

const logout = async (req, res, next) => {
    try {
        await sequelize.query("UPDATE employee_logins SET last_login = ? WHERE employee_id = ?",
            {
                replacements : [ date.format(now, 'YYYY-MM-DD HH:mm:ss'), req.user.employee_id]
        });
        res.status(200).json({ accessToken: null, response: 'Loggedout Successfully!', user: null});
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};

module.exports = { login, logout };