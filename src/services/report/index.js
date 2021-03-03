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
        await sequelize.query("SELECT lib.installment_id, lib.loan_id, l.amount, lib.due_date, lib.paid_date, getInstallmentStatus(lib.installment_status) as status FROM loan_installment_banks lib left join loans l using(loan_id) WHERE l.branch_id = ?", { replacements: [branch_id] }).then(
            async (foundInstallments) => {
                if (foundInstallments[0].length != 0) {
                    req.foundInstallments = foundInstallments;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Installments found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
}

module.exports = { transaction_report, loan_reports }