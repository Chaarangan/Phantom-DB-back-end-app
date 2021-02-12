const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');

const getTransactions = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM transactions ORDER BY transaction_id DESC").then(
            async (foundTransactions) => {
                if (foundTransactions[0].length != 0) {                   
                    req.transactions = foundTransactions;
                    next();
                }
                else {                   
                    return res.status(404).json({ response : "No Transactions found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};


module.exports = { getTransactions }