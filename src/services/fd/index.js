const sequelize = require("../../helpers/sequelizer");
const date = require('date-and-time');
const now = new Date();
var session = require('express-session');

const checkSavingAccount = async (req, res, next) => {
    try {
        const account_no = req.body.account_no,
            nic = req.body.nic;
        await sequelize.query("SELECT account_no, nic FROM customer_accounts LEFT JOIN accounts USING (account_no) LEFT JOIN individuals using (customer_id) WHERE (account_no = ? and nic = ?)", { replacements: [account_no, nic] }).then(
            async (foundAccount) => {
                if (foundAccount[0].length != 0) {
                    req.message = "Account Exists!";
                    req.session.account_no = account_no;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Saving account found with this details!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};

const createFDAccount = async (req, res, next) => {
    try {
        const amount = req.body.amount,
            account_no = req.session.account_no,
            plan_id = req.body.plan_id,
            date_time = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
            employee_id = req.user.employee_id,
            branch_id = req.user.branch_id;

        await sequelize.query("START TRANSACTION");
        await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [account_no, amount, 'false', "Fixed Deposit", date_time, employee_id, branch_id] }).then(
            async (results) => {
                const transaction_id = results[0];
                await sequelize.query("INSERT INTO bank_transactions SET transaction_id = ?", { replacements: [transaction_id] });
                await sequelize.query("INSERT INTO fixed_deposits SET account_no = ?, amount = ?, date_opened = ?, plan_id = ?, transaction_id = ?, fd_status = ?", { replacements: [account_no, amount, date_time, plan_id, transaction_id, 0] }).then(
                    async (results) => {
                        await sequelize.query("COMMIT");
                        const fd_no = results[0];
                        req.session.account_no  = null;
                        req.message = "Fd account has been created successfully. Created FD Account No : " + fd_no;
                        next();
                    });
            }
        );
    } catch (e) {
        console.log(e);
        await sequelize.query("ROLLBACK;");
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};



module.exports = { checkSavingAccount, createFDAccount }