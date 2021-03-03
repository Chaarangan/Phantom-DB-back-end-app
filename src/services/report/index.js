const sequelize = require("../../helpers/sequelizer");

const transaction_report = async (req, res, next) => {
    var branch_id = req.user.branch_id;

    //find family
    await sequelize.query("SELECT * from transaction_details WHERE branch_id = ? ORDER BY transaction_id", { replacements: [branch_id] }).then(
        async (foundTransactions) => {
            req.transactions = foundTransactions;
            next();
        });
}



const loan_reports = async (req, res, next) => {
    var branch_id = req.user.branch_id;

    //find family
    await sequelize.query("SELECT * from loan_installment_banks WHERE branch_id = ? ORDER BY transaction_id", { replacements: [branch_id] }).then(
        async (foundTransactions) => {
            req.transactions = foundTransactions;
            next();
        });
}