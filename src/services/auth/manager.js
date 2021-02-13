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
                            res.status(401).json({ accessToken: null, response: 'Incorrect Password!'});
                        }
                        else{
                            await sequelize.query("SELECT * FROM employees WHERE (employee_id = ? and (employee_id IN (SELECT * FROM managers)))", {replacements: [employee_id]}).then(
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
                                        return res.status(404).json({ response : "No Manager found with this username!" });
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
                    return res.status(404).json({ response : "No Manager found with this username!" });
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

const updateProfile = async (req, res, next) => {
    try {
        user_id = req.user.employee_id;
        await sequelize.query("SELECT * FROM employees WHERE employee_id = ?", {replacements : [user_id]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) { 
                    try {
                        const   first_name = req.body.first_name,
                                middle_name = req.body.middle_name,
                                last_name = req.body.last_name,
                                address = req.body.address,                                                             
                                primary_contact_no = req.body.primary_contact_no;
                        
                        await sequelize.query("UPDATE employees SET first_name = ?, middle_name = ?, last_name = ?, address = ?, primary_contact_no = ? WHERE employee_id = ?",
                            {
                                replacements : [ first_name, middle_name, last_name, address, primary_contact_no, user_id]
                            });

                        await sequelize.query("UPDATE employee_contact_nos SET contact_no = ? WHERE employee_id = ?",
                            {
                                replacements : [primary_contact_no, user_id]
                            }
                        );

                        const   recovery_email = req.body.recovery_email,
                                recovery_contact_no = req.body.recovery_contact_no;                                    
                                    
                        await sequelize.query("UPDATE employee_logins SET recovery_contact_no = ?, recovery_email = ? WHERE employee_id = ?",
                            {
                                replacements : [recovery_contact_no, recovery_email, user_id]
                            }
                        );
                        req.message = "Sucessfully Updated!";
                        next();

                    } catch (e) {
                        console.log(e);
                        next(ApiError.badRequest());
                    }              
                }
                else {
                    return res.status(404).json({ response : "No Employee found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};

module.exports = { login, logout, updateProfile };