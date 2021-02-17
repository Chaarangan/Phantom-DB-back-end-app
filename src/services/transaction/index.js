const sequelize = require("../../helpers/sequelizer");
const date = require('date-and-time');
const now = new Date();

const getBankTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT transaction_id, account_no, amount, withdraw, detail, date_time, teller, getBranch(branch_id) as branch_name  FROM bank_transactions LEFT JOIN transaction_details using (transaction_id) ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Bank Transactions found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};

const getATMTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT atm_transaction_id, transaction_id, atm_id, account_no, amount, withdraw, detail, date_time, teller, getBranch(branch_id) as branch_name FROM atm_transactions LEFT JOIN transaction_details using (transaction_id) ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No ATM Transactions found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
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
                    return res.status(404).json({ response: "No Online Transactions found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};

const getLoanTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT transaction_id, loan_id, account_no, amount, withdraw, detail, date_time, teller, getBranch(branch_id) as branch_name  FROM loan_transactions LEFT JOIN transaction_details USING(transaction_id) ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loan Transactions found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};

const createWithdrawTransaction = async (req, res, next) => {
    try {
        const account_no = req.body.account_no,
            amount = req.body.amount,
            detail = req.body.detail,
            date_time = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
            teller = req.user.employee_id,
            branch_id = req.user.branch_id;


        await sequelize.query("SELECT * FROM accounts WHERE account_no = ?", { replacements: [account_no] }).then(
            async (foundAccount) => {
                if (foundAccount[0][0].balance >= amount) {

                    await sequelize.query("START TRANSACTION");
                    await sequelize.query("UPDATE accounts SET balance = balance-? WHERE account_no = ?", { replacements: [amount, account_no] });
                    await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [account_no, amount, "true", detail, date_time, teller, branch_id] }).then(
                        async (results) => {
                            const transaction_id = results[0];

                            await sequelize.query("INSERT INTO bank_transactions SET transaction_id = ?", { replacements: [transaction_id] });
                            await sequelize.query("COMMIT");
                            req.message = "Withdrawed Successfully!";
                            next();
                        });
                }
                else {
                    return res.status(401).json({ response: "Insufficient Balance!", status: 401 });
                }
            });

    } catch (e) {
        console.log(e);
        await sequelize.query("ROLLBACK;");
        return res.status(400).json({ response: "Failed. Try Again!", status: 400 });
    }
};

const createDepositTransaction = async (req, res, next) => {
    try {
        const account_no = req.body.account_no,
            amount = req.body.amount,
            detail = req.body.detail,
            date_time = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
            teller = req.user.employee_id,
            branch_id = req.user.branch_id;

        await sequelize.query("START TRANSACTION");
        await sequelize.query("UPDATE accounts SET balance = balance+? WHERE account_no = ?", { replacements: [amount, account_no] });
        await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [account_no, amount, "false", detail, date_time, teller, branch_id] }).then(
            async (results) => {
                const transaction_id = results[0];

                await sequelize.query("INSERT INTO bank_transactions SET transaction_id = ?", { replacements: [transaction_id] });
                await sequelize.query("COMMIT");
                req.message = "Deposited Successfully!";
                next();
            });


    } catch (e) {
        console.log(e);
        await sequelize.query("ROLLBACK;");
        return res.status(400).json({ response: "Failed. Try Again!", status: 400 });
    }
};

const createCustomerTransaction = async (req, res, next) => {
    try {
        const fromAccount = req.body.fromAccount_no,
            toAccount = req.body.toAccount_no,
            amount = req.body.amount,
            detail = req.body.detail,
            date_time = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
            teller = req.user.customer_id;

        await sequelize.query("SELECT * FROM accounts WHERE account_no = ?", { replacements: [fromAccount] }).then(
            async (foundAccount) => {
                if (foundAccount[0][0].balance >= amount) {

                    await sequelize.query("START TRANSACTION");
                    await sequelize.query("UPDATE accounts SET balance = balance-? WHERE account_no = ?", { replacements: [amount, fromAccount] });
                    await sequelize.query("UPDATE accounts SET balance = balance+? WHERE account_no = ?", { replacements: [amount, toAccount] });


                    const fromBranchId = foundAccount[0][0].primary_branch_id;

                    await sequelize.query("SELECT * FROM accounts WHERE account_no = ?", { replacements: [toAccount] }).then(
                        async (results) => {
                            const toBranchId = results[0][0].primary_branch_id;

                            await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [fromAccount, amount, true, detail, date_time, teller, fromBranchId] }).then(
                                async (results) => {
                                    const withdrawTransaction_id = results[0];

                                    await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [toAccount, amount, false, detail, date_time, teller, toBranchId] }).then(
                                        async (results) => {
                                            const depositTransaction_id = results[0];

                                            await sequelize.query("INSERT INTO online_transactions SET withdrawal_id = ?, deposit_id = ?", { replacements: [withdrawTransaction_id, depositTransaction_id] });
                                            await sequelize.query("COMMIT");
                                            req.message = "Transfered Successfully!";
                                            next();
                                        });
                                });
                        });

                }
                else {
                    return res.status(401).json({ response: "Insufficient Balance!", status: 401 });
                }
            });
    } catch (e) {
        console.log(e);
        await sequelize.query("ROLLBACK;");
        return res.status(400).json({ response: "Failed. Try Again!", status: 400 });
    }
};


const getCustomerTransactionsByAccount = async (req, res, next) => {
    try {
        const account_no = req.body.account_no;
        await sequelize.query("SELECT * FROM online_deposit_view INNER JOIN online_withdraw_view USING(online_transaction_id) WHERE (sourceAccount = ? OR destinationAccount = ?) ORDER BY online_transaction_id DESC", { replacements: [account_no, account_no] }).then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {
                    req.transactions = foundTransactions;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Transactions found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};


module.exports = { getBankTransactions, getATMTransactions, getOnlineTransactions, getLoanTransactions, createDepositTransaction, createWithdrawTransaction, createCustomerTransaction, getCustomerTransactionsByAccount }