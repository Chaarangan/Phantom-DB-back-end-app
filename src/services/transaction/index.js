const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');

const getBankTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM bank_transactions LEFT JOIN transaction_details using (transaction_id) ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {                   
                    req.transactions = foundTransactions;
                    next();
                }
                else {                   
                    return res.status(404).json({ response : "No Bank Transactions found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
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
                    return res.status(404).json({ response : "No ATM Transactions found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
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
                    return res.status(404).json({ response : "No Online Transactions found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
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
                    return res.status(404).json({ response : "No Loan Transactions found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};


module.exports = { getBankTransactions, getATMTransactions, getOnlineTransactions, getLoanTransactions }