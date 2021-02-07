const initModels = async()=>{
    const atm_withdrawalModel = await require('./atm_withdrawal');        
    const bank_transactionModel = await require('./bank_transaction');  
    const bank_visit_loanModel = await require('./bank_visit_loan');  
    const checkbookModel = await require('./checkbook');  
    const child_savings_accountModel = await require('./child_savings_account');  
    const fixed_deposit_planModel = await require('./fixed_deposit_plan');  
    const fixed_depositModel = await require('./fixed_deposit');  
    const loan_arrearModel = await require('./loan_arrear');  
    const loan_installment_bankModel = await require('./loan_installment_bank');  
    const loan_typeModel = await require('./loan_type');  
    const loanModel = await require('./loan');  
    const online_loanModel = await require('./online_loan');  
    const online_transactionModel = await require('./online_transaction');  
    const requested_loanModel = await require('./requested_loan');  
    const saving_accountModel = await require('./saving_account');  
    const savings_account_planModel = await require('./savings_account_plan');  
    const transaction_detailModel = await require('./transaction_detail');  
}

module.exports = initModels;