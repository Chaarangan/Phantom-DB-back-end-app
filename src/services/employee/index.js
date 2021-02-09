const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const bcrypt=require("bcrypt");

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

module.exports = { createEmployee };