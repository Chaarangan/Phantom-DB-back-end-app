const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const date = require('date-and-time');
const now = new Date();

const getRequestedLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM requested_loans WHERE requested_loan_status = 0 ORDER BY request_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loan Requests found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};

const approveLoanRequest = async (req, res, next) => {
    try {
        const request_id = req.params.request_id;
        await sequelize.query("SELECT * FROM requested_loans WHERE (request_id = ? and requested_loan_status = ?)", { replacements: [request_id, 0] }).then(
            async (foundLoan) => {
                if (foundLoan[0].length != 0) {
                    const account_no = foundLoan[0][0].account_no,
                        loan_type = foundLoan[0][0].loan_type,
                        amount = foundLoan[0][0].amount,
                        branch_id = foundLoan[0][0].branch_id,
                        request_date = date.format(now, 'YYYY-MM-DD HH:mm:ss'),
                        time_period = foundLoan[0][0].time_period,
                        installment = foundLoan[0][0].installment,
                        loan_status = 0,
                        approved_by = req.user.employee_id,
                        requested_by = foundLoan[0][0].requested_by;

                    try {
                        await sequelize.query("START TRANSACTION;");
                        await sequelize.query("UPDATE requested_loans SET requested_loan_status = ? WHERE request_id = ?", { replacements: [1, request_id] });
                        await sequelize.query("INSERT INTO loans SET account_no = ?, loan_type = ?, amount = ?, branch_id = ?, date = ?, time_period = ?, installment = ?, loan_status = ?", { replacements: [account_no, loan_type, amount, branch_id, request_date, time_period, installment, loan_status] }).then(
                            async (results) => {
                                const loan_id = results[0];
                                await sequelize.query("INSERT INTO bank_visit_loans SET loan_id = ?, approved_date = ?, approved_by = ?, requested_by = ?", { replacements: [loan_id, request_date, approved_by, requested_by] });
                                await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?", { replacements: [account_no, amount, false, "Loan Accepted", request_date, "self"] });
                                await sequelize.query("UPDATE accounts SET balance = (balance +" + amount + ") WHERE account_no = ?", { replacements: [account_no] });

                                const loanEvent = `
                                        
                                        CREATE EVENT payInstallment${loan_id}
                                        ON SCHEDULE EVERY 1 MONTH  
                                        STARTS '${request_date}' + INTERVAL 1 MONTH
                                        DO 
                                            BEGIN 
                                                DECLARE bankBalance FLOAT; 
                                                SELECT balance INTO bankBalance FROM accounts WHERE account_no = ${account_no}; 
                                                IF bankBalance >= ${installment} THEN 
                                                    INSERT INTO transaction_details(account_no, amount, withdraw, detail, date_time, teller) 
                                                    values (${loan_id}, ${installment}, false, 'Loan Installment', '${request_date}', 'self'); 
                                                    UPDATE accounts SET balance = (balance - ${installment}) WHERE account_no = ${account_no}; 
                                                    INSERT INTO loan_installment_banks(loan_id, amount, due_date, paid_date) 
                                                    values(${loan_id}, ${installment}, '${request_date}', '${request_date}'); 
                                                ELSE  
                                                    INSERT INTO loan_arrears SET loan_id = ${loan_id}, due_date = '${request_date}', arrear_status = 0; 
                                                END IF; 
                                            END`;
                                
                                    await sequelize.query(loanEvent);           
                                
                                
                                await sequelize.query("COMMIT;");
                                req.message = "Approved Successfully!";
                                next();
                            });
                    }
                    catch (e) {                        
                        await sequelize.query("ROLLBACK;");
                        return res.status(400).json({ response: "Fail to approve this loan. Try Again!" });
                    }
                }
                else {
                    return res.status(404).json({ response: "No Loan with this id found for approval!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};


const getBankVisitLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM bank_visit_loans left join loans using (loan_id) ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loans found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};


const getLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM loans ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loans found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};

const getOnlineLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM online_loans left join loans using (loan_id) ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Online Loans found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};

module.exports = { getRequestedLoans, approveLoanRequest, getBankVisitLoans, getLoans, getOnlineLoans }