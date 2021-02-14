const sequelize = require("../../helpers/sequelizer");
const date = require('date-and-time');
const now = new Date();

const getBankTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM bank_transactions LEFT JOIN transaction_details using (transaction_id) ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Bank Transactions found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const getATMTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM atm_transactions LEFT JOIN transaction_details using (transaction_id) ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No ATM Transactions found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const getOnlineTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM online_deposit_view INNER JOIN online_withdraw_view USING(online_transaction_id) ORDER BY online_transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Online Transactions found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const getLoanTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM loan_transactions LEFT JOIN transaction_details USING(transaction_id) ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loan Transactions found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const createTransaction = async (req, res, next) => {
    try {
        const account_no = req.body.account_no,
            amount = req.body.amount,
            withdraw = req.body.transaction_type,
            detail = req.body.detail,
            date_time = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
            teller = req.body.teller,
            branch_id = req.user.branch_id;


        if (withdraw == "true") {
            await sequelize.query("SELECT * FROM accounts WHERE account_no = ?", { replacements: [account_no] }).then(
                async (foundAccount) => {
                    if (foundAccount[0][0].balance >= amount) {

                        await sequelize.query("START TRANSACTION");
                        await sequelize.query("UPDATE accounts SET balance = balance-? WHERE account_no = ?", { replacements: [amount, account_no] });
                        await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [account_no, amount, withdraw, detail, date_time, teller, branch_id] }).then(
                            async (results) => {
                                const transaction_id = results[0];

                                await sequelize.query("INSERT INTO bank_transactions SET transaction_id = ?", { replacements: [transaction_id] });
                                await sequelize.query("COMMIT");
                                req.message = "Withdrawed Successfully!";
                                next();
                            });
                    }
                    else {
                        return res.status(401).json({ response: "Insufficient Balance!", status : 401 });
                    }
                });
        }
        else {
            await sequelize.query("START TRANSACTION");
            await sequelize.query("UPDATE accounts SET balance = balance+? WHERE account_no = ?", { replacements: [amount, account_no] });
            await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [account_no, amount, withdraw, detail, date_time, teller, branch_id] }).then(
                async (results) => {
                    const transaction_id = results[0];

                    await sequelize.query("INSERT INTO bank_transactions SET transaction_id = ?", { replacements: [transaction_id] });
                    await sequelize.query("COMMIT");
                    req.message = "Deposited Successfully!";
                    next();
                });
        }

    } catch (e) {
        console.log(e);
        await sequelize.query("ROLLBACK;");
        return res.status(400).json({ response: "Failed. Try Again!", status : 400 });
    }
};




module.exports = { getBankTransactions, getATMTransactions, getOnlineTransactions, getLoanTransactions, createTransaction }