const sequelize = require("../../../helpers/sequelizer");
const ApiError = require('../../../helpers/ApiError');
const bcrypt = require("bcrypt");
var generator = require('generate-password');
const date = require('date-and-time');
const now = new Date();

const createAccount = async (req, res, next) => {
    const hasAccount = req.body.hasAccount;

    if (hasAccount == 1) { //New customer
        const customer_type = req.body.account_type,

            //individuals
            address_line_1 = req.body.address_line_1,
            address_line_2 = req.body.address_line_2,
            address_line_3 = req.body.address_line_3,
            primary_email = req.body.primary_email,
            primary_contact_no = req.body.primary_contact_no,

            //individuals
            first_name = req.body.first_name,
            last_name = req.body.last_name,
            middle_name = req.body.middle_name,
            nic = req.body.nic,
            dob = req.body.dob,
            gender = req.body.gender,

            //customer logins
            username = req.body.username,
            recovery_contact_no = req.body.recovery_contact_no,
            recovery_email = req.body.recovery_email,

            //accounts
            balance = req.body.balance,
            primary_branch_id = req.body.primary_branch_id;

        try {
            await sequelize.query("SELECT * FROM individuals WHERE nic = ?", { replacements: [nic] }).then(
                async (foundUsers) => {
                    if (foundUsers[0].length == 0) {
                        await sequelize.query("INSERT INTO customers SET address_line_1 = ?, address_line_2 = ?, address_line_3 = ?, primary_email = ?, primary_contact_no = ?, customer_type = ?", {replacements: [address_line_1, address_line_2, address_line_3, primary_email, primary_contact_no, customer_type]}).then(
                            async (foundUser) => {
                                const customer_id = foundUser[0][0].customer_id;
                                console.log(customer_id);
                            });

                        req.clerks = foundUsers;
                        next();
                    }
                    else {
                        return res.status(404).json({ response: "Customer with this NIC found!" });
                    }
                }
            );
        } catch (e) {
            console.log(e);
            next(ApiError.badRequest());
        }
    } else {

    }
};


module.exports = { createAccount }