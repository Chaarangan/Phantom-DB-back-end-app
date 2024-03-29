const sequelize = require("../../helpers/sequelizer");
const date = require('date-and-time');
const now = new Date();

const approveLoanRequest = async (req, res, next) => {
    try {
        const loan_id = req.params.loan_id,
            approved_by = req.user.employee_id;
        await sequelize.query("CALL approveLoan(" + loan_id + "," + approved_by + ")").then(
            async (results) => {
                if (results[0].OK == "OK") {
                    req.message = "Approved Successfully!";
                    next();
                }
                else {
                    return res.status(404).json({ response: "Failed!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};


const rejectLoanRequest = async (req, res, next) => {
    try {
        const
            loan_id = req.params.loan_id,
            rejected_by = req.user.employee_id;

        await sequelize.query("CALL rejectLoan(" + loan_id + "," + rejected_by + ")").then(
            async (results) => {
                if (results[0].OK == "OK") {
                    req.message = "Rejected Successfully!";
                    next();
                }
                else {
                    return res.status(400).json({ response: "Failed!", status: 400 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Failed!. Try again." });
    }
};

const createLoanRequest = async (req, res, next) => {
    try {
        const loan_type = req.body.loan_type,
            account_no = req.body.account_no,
            amount = req.body.amount,
            branch_id = req.user.branch_id,
            time_period = req.body.time_period,
            request_date = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
            requested_by = req.user.employee_id;

        await sequelize.query("SELECT calculateInstallment(?,?,?) as installment", { replacements: [amount, loan_type, time_period] }).then(
            async (foundInstallment) => {

                const installment = foundInstallment[0][0].installment;
                await sequelize.query("INSERT INTO loans SET loan_type = ?, account_no = ?, amount = ?, branch_id = ?, time_period = ?, installment = ?, requested_date = ?, requested_by = ?, loan_status = ?", { replacements: [loan_type, account_no, amount, branch_id, time_period, installment, request_date, requested_by, 0] }).then(
                    async (results) => {
                        req.message = "Success";
                        next();
                    }
                );
            });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};


const createOnlineLoanRequest = async (req, res, next) => {
    try {
        const loan_type = req.body.loan_type,
            fd_no = req.body.fd_no,
            amount = req.body.amount,
            branch_id = req.body.branch_id,
            time_period = req.body.time_period,
            request_date = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
            requested_by = req.user.customer_id;

        await sequelize.query("SELECT checkFdOwner(?,?)", { replacements: [fd_no, requested_by] }).then(
            async (foundOwner) => {
                const ress = foundOwner[0][0].res;
                if (ress == "OK") {
                    await sequelize.query("SELECT * from fixed_deposits WHERE fd_no = ?", { replacements: [fd_no] }).then(
                        async (foundFd) => {
                            if (foundFd[0].length > 0) {
                                const account_no = foundFd[0][0].account_no;
                                await sequelize.query("SELECT checkMinFdBalance(?,?) as res", { replacements: [fd_no, amount] }).then(
                                    async (foundRes) => {
                                        const ress = foundRes[0][0].res;
                                        if (ress == "OK") {
                                            await sequelize.query("SELECT calculateInstallment(?,?,?) as installment", { replacements: [amount, loan_type, time_period] }).then(
                                                async (foundInstallment) => {

                                                    const installment = foundInstallment[0][0].installment;
                                                    await sequelize.query("INSERT INTO loans SET loan_type = ?, account_no = ?, amount = ?, branch_id = ?, time_period = ?, installment = ?, requested_date = ?, requested_by = ?, loan_status = ?", { replacements: [loan_type, account_no, amount, branch_id, time_period, installment, request_date, requested_by, 1] }).then(
                                                        async (results) => {
                                                            const loan_id = results[0];
                                                            await sequelize.query("CALL approveOnlineLoan(" + loan_id + "," + fd_no + ")").then(
                                                                async (results) => {
                                                                    if (results[0].message == "OK") {
                                                                        req.message = "Transfered Successfully!";
                                                                        next();
                                                                    }
                                                                    else {
                                                                        return res.status(401).json({ response: "Failed!", status: 401 });
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    );
                                                });
                                        }
                                        else {
                                            return res.status(400).json({ status: 400, response: "Not Eligible" });
                                        }
                                    });
                            }
                            else {
                                return res.status(404).json({ status: 404, response: "Not found FD account!" });
                            }
                        });
                }
                else {
                    return res.status(400).json({ status: 400, response: "You are not a owner!" });
                }
            });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};

const getRequestedLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, requested_date, getEmployeeName(requested_by) as requested_by, getLoanStatus(loan_status) as loan_status  FROM loans WHERE loan_status = 0 ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loan Requests found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};

const getLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, requested_date, getEmployeeName(requested_by) as requested_by, getLoanStatus(loan_status) as loan_status  FROM loans ORDER BY loan_id ASC").then(
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
};




const getBankVisitLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, requested_date, getEmployeeName(requested_by) as requested_by, getLoanStatus(loan_status) as loan_status  FROM bank_visit_loans left join loans using(loan_id) WHERE loan_status = 1 ORDER BY loan_id ASC").then(
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
};




const getOnlineLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, requested_date, getEmployeeName(requested_by) as requested_by, getLoanStatus(loan_status) as loan_status  FROM online_loans left join loans using(loan_id) WHERE loan_status = 1 ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Online Loans found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};





const getRejectedLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, requested_date, getEmployeeName(requested_by) as requested_by, getLoanStatus(loan_status) as loan_status  FROM loans WHERE loan_status = 3 ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans[0];
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Rejected Loans found!", status: 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Failed!. Try again." });
    }
};

module.exports = { createOnlineLoanRequest, createLoanRequest, getRequestedLoans, approveLoanRequest, getBankVisitLoans, getLoans, getOnlineLoans, rejectLoanRequest, getRejectedLoans }