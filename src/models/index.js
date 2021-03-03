const initModels = async()=>{
    
    const account_branch = await require('./account/account_branch'); 
    const account = await require('./account/account'); 
    const atm_withdrawal = await require('./account/atm_withdrawal'); 
    const bank_transaction = await require('./account/bank_transaction'); 
    const checking_account = await require('./account/checking_account'); 
    const child_savings_account = await require('./account/child_savings_account'); 
    const customer_account = await require('./account/customer_account'); 
    const fixed_deposit = await require('./account/fixed_deposit'); 
    const fixed_deposit_plan = await require('./account/fixed_deposit_plan'); 
    const online_transaction = await require('./account/online_transaction'); 
    const saving_account = await require('./account/saving_account'); 
    const savings_account_plan = await require('./account/savings_account_plan');
    const transaction_detail = await require('./account/transaction_detail'); 
      
    const customer = await require('./customer/customer');
    const customer_login = await require('./customer/customer_login'); 
    const individual = await require('./customer/individual'); 
    const organization = await require('./customer/organization'); 
    const organization_individual = await require('./customer/organization_individual'); 

    const employee = await require('./employee/employee'); 
    const employee_login = await require('./employee/employee_login'); 

    const bank_visit_loan = await require('./loan/bank_visit_loan');
    const loan = await require('./loan/loan');
    const loan_arrear = await require('./loan/loan_arrear');
    const loan_installment_bank = await require('./loan/loan_installment_bank');
    const loan_type = await require('./loan/loan_type');
    const online_loan = await require('./loan/online_loan');

    const branch = await require('./branch');
}

module.exports = initModels;