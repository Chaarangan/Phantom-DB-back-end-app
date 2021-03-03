const sequelize = require("../../helpers/sequelizer");
const date = require('date-and-time');
const now = new Date();


// create bank transaction
const createBankTransaction = async (req, res, next) => {
    try {
        const account_no = req.body.account_no,
            amount = req.body.amount,
            transaction_type = req.body.transaction_type,
            detail = req.body.detail,
            teller = req.user.employee_id,
            branch_id = req.user.branch_id;

        await sequelize.query("CALL makeBankTransaction(" + account_no + "," + amount  + "," + transaction_type + "," + detail + "," + teller + "," + branch_id + ");").then(
            async (results) => {
                if(results[0].OK == "OK"){
                    req.message = "Transfered Successfully!";
                    next();
                }
                else{
                    return res.status(400).json({ response: "Failed. Try Again!", status: 400 });
                }
            });


    } catch (e) {
        console.log(e);
        return res.status(400).json({ response: "Failed. Try Again!", status: 400 });
    }
};


//create online rtnsaction
const createOnlineTransaction = async (req, res, next) => {
    try {
        const fromAccount = req.body.fromAccount_no,
            toAccount = req.body.toAccount_no,
            amount = req.body.amount,
            detail = req.body.detail;

        await sequelize.query('CALL makeOnlineTransaction(' + fromAccount + ',' + toAccount  + ',' + amount + ',"' + detail + '");').then(
            async (results) => {
                if(results[0].OK == "OK"){
                    req.message = "Transfered Successfully!";
                    next();
                }
                else {
                    return res.status(400).json({ response: results[0].OK, status: 400 });
                }
            });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ response: "Failed. Try Again!", status: 400 });
    }
};








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


module.exports = { createBankTransaction, getBankTransactions, getATMTransactions,  getOnlineTransactions, getLoanTransactions, createOnlineTransaction, getBankTransactions, getCustomerTransactionsByAccount}