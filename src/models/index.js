const initModels = async()=>{
    
    const account_branch = await require('./Account/account_branch'); 
    const account = await require('./Account/account'); 
    const atm_withdrawal = await require('./Account/atm_withdrawal'); 
    const bank_transaction = await require('./Account/bank_transaction'); 
    const checkbook = await require('./Account/checkbook'); 
    const checking_account = await require('./Account/checking_account'); 
    const child_savings_account = await require('./Account/child_savings_account'); 
    const customer_account = await require('./Account/customer_account'); 
    const fixed_deposit = await require('./Account/fixed_deposit'); 
    const fixed_deposit_plan = await require('./Account/fixed_deposit_plan'); 
    const online_transaction = await require('./Account/online_transaction'); 
    const saving_account = await require('./Account/saving_account'); 
    const savings_account_plan = await require('./Account/savings_account_plan');
    const transaction_detail = await require('./Account/transaction_detail'); 
      
    const customer = await require('./Customer/customer');
    const customer_contact_no = await require('./Customer/customer_contact_no'); 
    const customer_email = await require('./Customer/customer_email'); 
    const customer_login = await require('./Customer/customer_login'); 
    const individual = await require('./Customer/individual'); 
    const organization = await require('./Customer/organization'); 
    const organization_individual = await require('./Customer/organization_individual'); 

    const clerk = await require('./Employee/clerk'); 
    const employee = await require('./Employee/employee'); 
    const employee_contact_no = await require('./Employee/employee_contact_no'); 
    const employee_login = await require('./Employee/employee_login'); 
    const manager = await require('./Employee/manager'); 

    const bank_visit_loan = await require('./Loan/bank_visit_loan');
    const loan = await require('./Loan/loan');
    const loan_arrear = await require('./Loan/loan_arrear');
    const loan_installment_bank = await require('./Loan/loan_installment_bank');
    const loan_type = await require('./Loan/loan_type');
    const online_loan = await require('./Loan/online_loan');
    const requested_loan = await require('./Loan/requested_loan');

    const branch = await require('./branch');
}

module.exports = initModels;