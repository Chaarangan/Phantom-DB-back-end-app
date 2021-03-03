const sequelize = require("../../helpers/sequelizer");

const transaction_report = async (req, res, next) => {
    const branch_id = req.user.branch_id;
    try {
        await sequelize.query("SELECT transaction_id, account_no, amount, getTransactionStatus(withdraw) as transfer_type, detail, date_time FROM transaction_details WHERE branch_id = ? ORDER BY transaction_id ASC", { replacements: [branch_id] }).then(
            async (foundTransactions) => {
                req.transactions = foundTransactions;
                next();
            });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
}



const loan_reports = async (req, res, next) => {
    const branch_id = req.user.branch_id;
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, time_period, installment, requested_date, getEmployeeName(requested_by) as requested_by, getLoanStatus(loan_status) as loan_status  FROM loans WHERE branch_id = ? ORDER BY loan_id ASC", { replacements: [branch_id] }).then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loans found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
}


module.exports = { transaction_report, loan_reports }