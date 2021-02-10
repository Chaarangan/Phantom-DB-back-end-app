const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const bcrypt=require("bcrypt");
var generator = require('generate-password');

//mailer
const nodemailer = require('nodemailer');  
var smtpTransport = require('nodemailer-smtp-transport'); 
let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'testing.c98@gmail.com',
        pass: 'Bank2021'
      }
}));

const createEmployee = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE nic = ?", {replacements: [req.body.nic]}).then(
            async (foundUser) => {
                if (foundUser[0].length == 0) {
                    try {
                        const   first_name = req.body.first_name,
                                middle_name = req.body.middle_name,
                                last_name = req.body.last_name,
                                address = req.body.address,
                                nic = req.body.nic,
                                dob = req.body.dob,
                                gender = req.body.gender,
                                primary_contact_no = req.body.primary_contact_no,
                                branch_id = req.body.branch_id;
                        
                        await sequelize.query("INSERT INTO employees SET first_name = ?, middle_name = ?, last_name = ?, address = ?, nic = ?, dob = ?, gender = ?, primary_contact_no = ?, branch_id = ?",
                            {
                                replacements : [ first_name, middle_name, last_name, address, nic, dob, gender, primary_contact_no, branch_id]
                            });

                        await sequelize.query("SELECT * FROM employees WHERE nic = ?", {replacements: [nic]}).then(
                            async (foundUser) => {
                                try {
                                    sequelize.query("INSERT INTO employee_contact_nos SET employee_id = ?, contact_no = ?",
                                        {
                                            replacements : [foundUser[0][0].employee_id, primary_contact_no]
                                        }
                                    );

                                    const   type = req.body.type,
                                            username = req.body.username,
                                            password = req.body.password,                                   
                                            recovery_email = req.body.recovery_email,
                                            recovery_contact_no = req.body.recovery_contact_no;

                                    
                                    await bcrypt.genSalt(10, (err, salt) => {
                                        bcrypt.hash(password, salt, (err, hash) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                sequelize.query("INSERT INTO employee_logins SET employee_id = ?, username = ?, password = ?, recovery_contact_no = ?, recovery_email = ?",
                                                    {
                                                        replacements : [foundUser[0][0].employee_id, username, hash, recovery_contact_no, recovery_email]
                                                    }
                                                );

                                                if(type == 1){
                                                    sequelize.query("INSERT INTO managers SET employee_id = ?",
                                                        {
                                                            replacements : [foundUser[0][0].employee_id]
                                                        }
                                                    );
                                                }
                                                else{
                                                    sequelize.query("INSERT INTO clerks SET employee_id = ?",
                                                        {
                                                            replacements : [foundUser[0][0].employee_id]
                                                        }
                                                    );
                                                }
                                                req.message = "Sucessfully Created!";
                                                next();
                                            }
                                        });
                                    });
                                }
                                catch (e){
                                    console.log(e);
                                    next(ApiError.badRequest());
                                }
                        });
                    } catch (e) {
                        console.log(e);
                        next(ApiError.badRequest());
                    }
                }
                else {
                    return res.status(404).json({ response : "Employee with this NIC found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};


const getEmployees = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees").then(
            async (foundUsers) => {
                if (foundUsers[0].length != 0) {                   
                    req.employees = foundUsers;
                    next();
                }
                else {                   
                    return res.status(404).json({ response : "No Employees found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};


const getEmployeeById = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE employee_id = ?", {replacements : [req.params.employee_id]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {                   
                    req.employee = foundUser;
                    next();
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

const updateEmployeeById = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE employee_id = ?", {replacements : [req.params.employee_id]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) { 
                    try {
                        const   first_name = req.body.first_name,
                                middle_name = req.body.middle_name,
                                last_name = req.body.last_name,
                                address = req.body.address,
                                nic = req.body.nic,                                
                                primary_contact_no = req.body.primary_contact_no,
                                branch_id = req.body.branch_id;
                        
                        await sequelize.query("UPDATE employees SET first_name = ?, middle_name = ?, last_name = ?, address = ?, nic = ?, primary_contact_no = ?, branch_id = ? WHERE employee_id = ?",
                            {
                                replacements : [ first_name, middle_name, last_name, address, nic, primary_contact_no, branch_id, req.params.employee_id]
                            });

                        await sequelize.query("UPDATE employee_contact_nos SET contact_no = ? WHERE employee_id = ?",
                            {
                                replacements : [primary_contact_no, req.params.employee_id]
                            }
                        );

                        const   recovery_email = req.body.recovery_email,
                                recovery_contact_no = req.body.recovery_contact_no;                                    
                                    
                        await sequelize.query("UPDATE employee_logins SET recovery_contact_no = ?, recovery_email = ? WHERE employee_id = ?",
                            {
                                replacements : [recovery_contact_no, recovery_email, req.params.employee_id]
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

const sendRandomPassword = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employee_logins WHERE employee_id = ?", {replacements: [req.params.employee_id]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {                       
                        const   recovery_email = foundUser[0][0].recovery_email,
                                randrom_password = generator.generate({ length: 10, numbers: true });
                        
                        await bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(randrom_password, salt, (err, hash) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    sequelize.query("UPDATE employee_logins SET password = ? WHERE employee_id = ?",
                                        {
                                            replacements : [hash, req.params.employee_id]
                                        }
                                    );

                                     //send email
                                     var mailOptions = {
                                        from: 'testing.c98@gmail.com',
                                        to: recovery_email,
                                        subject: 'Password Reset',
                                        text: 'Your Password : ' + randrom_password + '. You have to change it when you login.'
                                    };
                                                                    
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                            return res.status(401).json({ status : 'error', message : error });
                                        }
                                        else{
                                            req.message = "Sucessfully Send!";
                                            next();
                                        }
                                    });  
                                }
                            });
                        });
                    } catch (e) {
                        console.log(e);
                        next(ApiError.badRequest());
                    }
                }
                else {
                    return res.status(404).json({ response : "Employee with this NIC found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};

module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployeeById, sendRandomPassword };