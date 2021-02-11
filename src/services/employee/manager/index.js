const sequelize = require("../../../helpers/sequelizer");
const ApiError = require('../../../helpers/ApiError');
const bcrypt=require("bcrypt");
const config = require("../../../config/index");
var jwt = require("jsonwebtoken");
var generator = require('generate-password');
const date = require('date-and-time');
const now = new Date();

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

const getClerks = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE ((employee_id IN (SELECT * FROM clerks)) and (branch_id = ?))", {replacements: [req.user.branch_id]}).then(
            async (foundUsers) => {
                if (foundUsers[0].length != 0) {                   
                    req.clerks = foundUsers;
                    next();
                }
                else {                   
                    return res.status(404).json({ response : "No Clerks found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};

const getClerkById = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE (employee_id = ? and branch_id = ? and (employee_id in (SELECT * FROM clerks)))", {replacements : [req.params.clerk_id, req.user.branch_id]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {                   
                    req.clerk = foundUser;
                    next();
                }
                else {
                    return res.status(404).json({ response : "No Clerk found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};

module.exports = { updateProfile, getClerks, getClerkById }