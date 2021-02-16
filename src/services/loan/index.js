const sequelize = require("../../helpers/sequelizer");
const date = require('date-and-time');
const now = new Date();

const createLoanRequest = async (req, res, next) => {
    try {
        const   loan_type = req.body.loan_type,
                account_no = req.body.account_no,
                amount = req.body.amount,
                branch_id = req.user.branch_id,
                time_period = req.body.time_period,
                installment_type = req.body.installment_type,
                request_date = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
                request_by = req.user.employee_id;
                
        await sequelize.query("SELECT * FROM requested_loans WHERE requested_loan_status = 0 ORDER BY request_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loan Requests found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const getRequestedLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT request_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, getInstallmentType(installment_type) as installment_type, requested_date, getEmployeeName(requested_by) as requested_by, getRequestedLoanStatus(requested_loan_status) as request_status  FROM requested_loans WHERE requested_loan_status = 0 ORDER BY request_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loan Requests found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
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
                        approve_date = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
                        time_period = foundLoan[0][0].time_period,
                        installment = foundLoan[0][0].installment,
                        installment_type = foundLoan[0][0].installment_type,
                        loan_status = 0,
                        approved_by = req.user.employee_id,
                        requested_by = foundLoan[0][0].requested_by;

                    try {
                        await sequelize.query("START TRANSACTION;");
                        await sequelize.query("UPDATE requested_loans SET requested_loan_status = ? WHERE request_id = ?", { replacements: [1, request_id] });
                        await sequelize.query("INSERT INTO loans SET account_no = ?, loan_type = ?, amount = ?, branch_id = ?, date = ?, time_period = ?, installment = ?, loan_status = ?", { replacements: [account_no, loan_type, amount, branch_id, approve_date, time_period, installment, loan_status] }).then(
                            async (loanResults) => {
                                const loan_id = loanResults[0];
                                await sequelize.query("INSERT INTO bank_visit_loans SET loan_id = ?, approved_date = ?, approved_by = ?, requested_by = ?", { replacements: [loan_id, approve_date, approved_by, requested_by] });
                                await sequelize.query("INSERT INTO transaction_details SET account_no = ?, amount = ?, withdraw = ?, detail = ?, date_time = ?, teller = ?, branch_id = ?", { replacements: [account_no, amount, false, "Loan Accepted", approve_date, "self", req.user.branch_id] }).then(
                                    async (transactionResults) => {
                                        const transaction_id = transactionResults[0];
                                        await sequelize.query("INSERT INTO loan_transactions SET transaction_id = ?, loan_id = ?", { replacements: [transaction_id, loan_id] });
                                        await sequelize.query("UPDATE accounts SET balance = (balance +" + amount + ") WHERE account_no = ?", { replacements: [account_no] });
                                        
                                        await sequelize.query("SET time_zone = '+05:30'");

                                        var next_month = date.addMonths(now, 1);                                        
                                        for (var i =0; i < time_period; i++){                 
                                            var todayDate = date.format(next_month, 'YYYY-MM-DD');                                                                    
                                            await sequelize.query("INSERT INTO loan_installment_banks SET loan_id = ?, amount = ?, due_date = ?, paid_date = ?, installment_status = ?", { replacements: [loan_id, installment, todayDate, null, 0] });
                                            next_month = date.addMonths(next_month, 1);
                                        }

                                        if(installment_type == 1){
                                            const nextMonthOnly = date.format(next_month, 'YYYY-MM-DD');
                                            const loanEvent = `                                        
                                                    CREATE EVENT payInstallment${loan_id}
                                                    ON SCHEDULE EVERY 1 MONTH  
                                                    STARTS '${nextMonthOnly}'
                                                    DO 
                                                        BEGIN 
                                                            DECLARE bankBalance FLOAT, isPaid INT, installment_id INT; 
                                                            SELECT balance INTO bankBalance FROM accounts WHERE account_no = ${account_no}; 
                                                            SELECT installment_status INTO isPaid, installment_id INTO installment_id FROM loan_installment_banks WHERE due_date = (SELECT CURRENT_DATE()); 
                                                            IF isPaid == 0 THEN
                                                                IF bankBalance >= ${installment} THEN 
                                                                    INSERT INTO transaction_details(account_no, amount, withdraw, detail, date_time, teller) 
                                                                    values (${loan_id}, ${installment}, false, 'Loan Installment', '${approve_date}', 'self'); 
                                                                    UPDATE accounts SET balance = (balance - ${installment}) WHERE account_no = ${account_no}; 
                                                                    UPDATE loan_installment_banks SET installment_status = 1, paid_date = CURRENT_TIMESTAMP WHERE installment_id = installment_id; 
                                                                ELSE  
                                                                    INSERT INTO loan_arrears SET loan_id = ${loan_id}, due_date = '${approve_date}', arrear_status = 0; 
                                                                END IF; 
                                                            END IF;
                                                        END`;
                                        
                                                await sequelize.query(loanEvent);     
                                        }                               
                                        
                                        await sequelize.query("COMMIT;");
                                        req.message = "Approved Successfully!";
                                        next();
                                    });
                            });
                    }
                    catch (e) {          
                        console.log(e);              
                        await sequelize.query("ROLLBACK;");
                        return res.status(400).json({ response: "Fail to approve this loan. Try Again!", status : 400 });
                    }
                }
                else {
                    return res.status(404).json({ response: "No Loan with this id found for approval!" , status : 404});
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }

};


const getBankVisitLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, getInstallmentType(installment_type) as installment_type, approved_date, getEmployeeName(requested_by) as requested_by, getEmployeeName(approved_by) as approved_by, getLoanStatus(loan_status) as loan_status FROM bank_visit_loans left join loans using (loan_id) ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loans found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};


const getLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, date, time_period, installment, getInstallmentType(installment_type) as installment_type, getLoanStatus(loan_status) as loan_status FROM loans ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loans found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const getOnlineLoans = async (req, res, next) => {
    try {
        await sequelize.query("SELECT loan_id, getLoanType(loan_type) as loan_type, account_no, fd_no, amount, getBranch(branch_id) as branch_name, time_period, installment, getInstallmentType(installment_type) as installment_type, date, getLoanStatus(loan_status) as loan_status FROM online_loans left join loans using (loan_id) ORDER BY loan_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {
                    req.loans = foundLoans;
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Online Loans found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};


const rejectLoanRequest = async (req, res, next) => {
    try {
        const   reason = req.body.reason,
                rejected_date = date.format(now, 'YYYY-MM-DD HH:mm:ss GMT+0530'),
                request_id = req.params.request_id;
                
        await sequelize.query("SELECT * FROM requested_loans WHERE request_id = ?", {replacements : [request_id]}).then(
            async (foundLoan) => {
                if (foundLoan[0].length != 0) {
                    await sequelize.query("START TRANSACTION");
                    await sequelize.query("INSERT INTO rejected_loans SET request_id = ?, date = ?, rejected_by = ?, reason = ?", {replacements : [request_id, rejected_date, req.user.employee_id, reason]});
                    await sequelize.query("UPDATE requested_loans SET requested_loan_status = ? WHERE request_id = ?", {replacements : [2, request_id]});
                    await sequelize.query("COMMIT");
                    req.message = "Rejected Successfully!";
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Loan Requests found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        await sequelize.query("ROLLBACK;");
        return res.status(400).json({status: 400, response: "Failed!. Try again."});
    }
};


const getRejectedLoans = async (req, res, next) => {
    try {                      
        await sequelize.query("SELECT request_id, getLoanType(loan_type) as loan_type, account_no, amount, getBranch(branch_id) as branch_name, time_period, installment, getInstallmentType(installment_type) as installment_type, date, getEmployeeName(requested_by) as requested_by, getEmployeeName(rejected_by) as rejected_by, reason, getRequestedLoanStatus(requested_loan_status) as loan_status FROM rejected_loans LEFT JOIN requested_loans USING(request_id) ORDER BY request_id ASC").then(
            async (foundLoans) => {
                if (foundLoans[0].length != 0) {                    
                    req.loans = foundLoans[0][0];
                    next();
                }
                else {
                    return res.status(404).json({ response: "No Rejected Loans found!", status : 404 });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Failed!. Try again."});
    }
};

module.exports = { getRequestedLoans, approveLoanRequest, getBankVisitLoans, getLoans, getOnlineLoans, rejectLoanRequest, getRejectedLoans }