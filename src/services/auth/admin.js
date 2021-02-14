const sequelize = require("../../helpers/sequelizer");
const bcrypt = require("bcrypt");
const config = require("../../config/index");
var jwt = require("jsonwebtoken");
var generator = require('generate-password');
const date = require('date-and-time');
const now = new Date();

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

const login = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employee_logins WHERE username = ?", { replacements: [req.body.username] }).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {
                        const employee_id = foundUser[0][0].employee_id,
                            password = foundUser[0][0].password;

                        if (!(await bcrypt.compare(req.body.password, password))) {
                            return res.status(401).json({ accessToken: null, status: "error", message: 'Incorrect Password!', status : 401 });
                        }
                        else {
                            await sequelize.query("SELECT * FROM admins WHERE employee_id = ?", { replacements: [employee_id] }).then(
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
                                    else {
                                        return res.status(404).json({ response: "No Admin found with this username!", status : 404});
                                    }

                                }
                            );
                        }
                    }
                    catch (e) {
                        console.log(e);
                        return res.status(400).json({status: 400, response: "Bad Request!"});
                    }
                }
                else {
                    return res.status(404).json({ response: "No Admin found with this username!", status : 404});
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const logout = async (req, res, next) => {
    try {
        await sequelize.query("UPDATE employee_logins SET last_login = ? WHERE employee_id = ?",
            {
                replacements: [date.format(now, 'YYYY-MM-DD HH:mm:ss'), req.userId]
            });
        return res.status(200).json({ accessToken: null, response: 'Loggedout Successfully!', user: null, status : 200});
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const createEmployee = async (req, res, next) => {
    try {
        const first_name = req.body.first_name,
            middle_name = req.body.middle_name,
            last_name = req.body.last_name,
            address = req.body.address,
            nic = req.body.nic,
            dob = req.body.dob,
            gender = req.body.gender,
            primary_contact_no = req.body.primary_contact_no,
            branch_id = req.body.branch_id;

        const type = req.body.type,
            username = req.body.username,
            password = req.body.password,
            recovery_email = req.body.recovery_email,
            recovery_contact_no = req.body.recovery_contact_no;

        var CheckQuery;
        if (type == 1) {
            CheckQuery = "select * from managers m left join employees e on m.employee_id = e.employee_id LEFT JOIN employee_logins el ON el.employee_id = m.employee_id  WHERE (e.nic = ? or el.username = ?);";
        } else {
            CheckQuery = "select * from clerks c left join employees e on c.employee_id = e.employee_id LEFT JOIN employee_logins el ON el.employee_id = c.employee_id  WHERE (e.nic = ? or el.username = ?);";
        }
        await sequelize.query(CheckQuery, { replacements: [req.body.nic, req.body.username] }).then(
            async (foundUser) => {
                if (foundUser[0].length == 0) {
                    try {

                        await sequelize.query("INSERT INTO employees SET first_name = ?, middle_name = ?, last_name = ?, address = ?, nic = ?, dob = ?, gender = ?, primary_contact_no = ?, branch_id = ?",
                            {
                                replacements: [first_name, middle_name, last_name, address, nic, dob, gender, primary_contact_no, branch_id]
                            });

                        await sequelize.query("SELECT * FROM employees WHERE nic = ?", { replacements: [nic] }).then(
                            async (foundUser) => {
                                try {
                                    sequelize.query("INSERT INTO employee_contact_nos SET employee_id = ?, contact_no = ?",
                                        {
                                            replacements: [foundUser[0][0].employee_id, primary_contact_no]
                                        }
                                    );

                                    await bcrypt.genSalt(10, (err, salt) => {
                                        bcrypt.hash(password, salt, (err, hash) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                sequelize.query("INSERT INTO employee_logins SET employee_id = ?, username = ?, password = ?, recovery_contact_no = ?, recovery_email = ?",
                                                    {
                                                        replacements: [foundUser[0][0].employee_id, username, hash, recovery_contact_no, recovery_email]
                                                    }
                                                );

                                                if (type == 1) {
                                                    sequelize.query("INSERT INTO managers SET employee_id = ?",
                                                        {
                                                            replacements: [foundUser[0][0].employee_id]
                                                        }
                                                    );
                                                }
                                                else {
                                                    sequelize.query("INSERT INTO clerks SET employee_id = ?",
                                                        {
                                                            replacements: [foundUser[0][0].employee_id]
                                                        }
                                                    );
                                                }
                                                req.message = "Sucessfully Created!";
                                                next();
                                            }
                                        });
                                    });
                                }
                                catch (e) {
                                    console.log(e);
                                    return res.status(400).json({status: 400, response: "Bad Request!"});
                                }
                            });
                    } catch (e) {
                        console.log(e);
                        return res.status(400).json({status: 400, response: "Bad Request!"});
                    }
                }
                else {
                    return res.status(404).json({ response: "Employee with this NIC or Username found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
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
                    return res.status(404).json({ response: "No Employees found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }

};


const getEmployeeById = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE employee_id = ?", { replacements: [req.params.employee_id] }).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    req.employee = foundUser;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Employee found!", status : 404});
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }

};

const updateEmployeeById = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE employee_id = ?", { replacements: [req.params.employee_id] }).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {
                        const first_name = req.body.first_name,
                            middle_name = req.body.middle_name,
                            last_name = req.body.last_name,
                            address = req.body.address,
                            nic = req.body.nic,
                            primary_contact_no = req.body.primary_contact_no,
                            branch_id = req.body.branch_id;

                        await sequelize.query("UPDATE employees SET first_name = ?, middle_name = ?, last_name = ?, address = ?, nic = ?, primary_contact_no = ?, branch_id = ? WHERE employee_id = ?",
                            {
                                replacements: [first_name, middle_name, last_name, address, nic, primary_contact_no, branch_id, req.params.employee_id]
                            });

                        await sequelize.query("UPDATE employee_contact_nos SET contact_no = ? WHERE employee_id = ?",
                            {
                                replacements: [primary_contact_no, req.params.employee_id]
                            }
                        );

                        const recovery_email = req.body.recovery_email,
                            recovery_contact_no = req.body.recovery_contact_no;

                        await sequelize.query("UPDATE employee_logins SET recovery_contact_no = ?, recovery_email = ? WHERE employee_id = ?",
                            {
                                replacements: [recovery_contact_no, recovery_email, req.params.employee_id]
                            }
                        );
                        req.message = "Sucessfully Updated!";
                        next();

                    } catch (e) {
                        console.log(e);
                        return res.status(400).json({status: 400, response: "Bad Request!"});
                    }
                }
                else {
                    return res.status(404).json({ response: "No Employee found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }

};

const sendRandomPassword = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employee_logins WHERE employee_id = ?", { replacements: [req.params.employee_id] }).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {
                        const recovery_email = foundUser[0][0].recovery_email,
                            randrom_password = generator.generate({ length: 10, numbers: true });

                        await bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(randrom_password, salt, (err, hash) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    sequelize.query("UPDATE employee_logins SET password = ? WHERE employee_id = ?",
                                        {
                                            replacements: [hash, req.params.employee_id]
                                        }
                                    );

                                    //send email
                                    var mailOptions = {
                                        from: 'testing.c98@gmail.com',
                                        to: recovery_email,
                                        subject: 'Password Reset',
                                        text: 'Your Password : ' + randrom_password + '. You have to change it when you login.'
                                    };

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            return res.status(401).json({ response: error, status : 401 });
                                        }
                                        else {
                                            req.message = "Sucessfully Send!";
                                            next();
                                        }
                                    });
                                }
                            });
                        });
                    } catch (e) {
                        console.log(e);
                        return res.status(400).json({status: 400, response: "Bad Request!"});
                    }
                }
                else {
                    return res.status(404).json({ response: "Employee with this NIC found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }

};

module.exports = { login, logout, createEmployee, getEmployees, getEmployeeById, updateEmployeeById, sendRandomPassword };