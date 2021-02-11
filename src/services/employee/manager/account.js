const sequelize = require("../../../helpers/sequelizer");
const ApiError = require('../../../helpers/ApiError');
const bcrypt = require("bcrypt");
var generator = require('generate-password');
const date = require('date-and-time');
const now = new Date();

const createIndividualAccount = async (req, res, next) => {
    const hasAccount = req.body.hasAccount;

    if (hasAccount == 1) { //New customer
        const customer_type = req.body.customer_type,

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
            primary_branch_id = req.body.primary_branch_id,


            //account type
            account_type = req.body.account_type,
            


        try {
            await sequelize.query("SELECT * FROM individuals WHERE nic = ?", { replacements: [nic] }).then(
                async (foundUsers) => {
                    if (foundUsers[0].length == 0) {
                        await sequelize.query("INSERT INTO customers SET address_line_1 = ?, address_line_2 = ?, address_line_3 = ?, primary_email = ?, primary_contact_no = ?, customer_type = ?", { replacements: [address_line_1, address_line_2, address_line_3, primary_email, primary_contact_no, customer_type] }).then(
                            async (foundUser) => {
                                const customer_id = foundUser[0];
                                const account_no;

                                //emails
                                if (primary_email != recovery_email) {
                                    await sequelize.query("INSERT INTO customer_emails SET customer_id = ?, email = ?",
                                        {
                                            replacements: [[customer_id, primary_email], [customer_id, recovery_email]]
                                        });
                                }
                                else {
                                    await sequelize.query("INSERT INTO customer_emails SET customer_id = ?, email = ?",
                                        {
                                            replacements: [customer_id, primary_email]
                                        });
                                }

                                //contact numbers
                                if (primary_contact_no != recovery_contact_no) {
                                    await sequelize.query("INSERT INTO customer_contact_nos SET customer_id = ?, contact_no = ?",
                                        {
                                            replacements: [[customer_id, primary_contact_no], [customer_id, recovery_contact_no]]
                                        });
                                }
                                else {
                                    await sequelize.query("INSERT INTO customer_contact_nos SET customer_id = ?, contact_no = ?",
                                        {
                                            replacements: [customer_id, primary_contact_no]
                                        });
                                }

                                //individuals
                                await sequelize.query("INSERT INTO individuals SET customer_id = ?, first_name = ?, last_name = ?, middle_name = ?, nic = ?, dob = ?, gender = ?",
                                    {
                                        replacements: [customer_id, first_name, last_name, middle_name, nic, dob, gender]
                                    });

                                //accounts
                                await sequelize.query("INSERT INTO accounts SET is_active = ?, balance = ?, primary_customer_id = ?, primary_branch_id = ?, date_created = ?",
                                    {
                                        replacements: [0, balance, customer_id, primary_branch_id, date.format(now, 'YYYY-MM-DD HH:mm:ss')]
                                    }).then(
                                        async (foundAccount) => {
                                            account_no = foundAccount[0];
                                            console.log(account_no);
                                        });
                                //account branches
                                await sequelize.query("INSERT INTO account_branches SET account_no = ?, branch_id = ?",
                                    {
                                        replacements: [account_no, primary_branch_id]
                                    });

                                //account branches
                                await sequelize.query("INSERT INTO customer_accounts SET customer_id = ?, account_no = ?",
                                    {
                                        replacements: [customer_id, account_no]
                                    });

                                











                                next();
                            });
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

    }
};


module.exports = { createIndividualAccount }