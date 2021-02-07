const initModels = async()=>{
    const atm_withdrawalModel = await require('./atm_withdrawalModel');        
    const bank_transactionModel = await require('./bank_transactionModel');  
    const bank_visit_loanModel = await require('./bank_visit_loanModel');  
    const checkbookModel = await require('./checkbookModel');  
    const child_savings_accountModel = await require('./child_savings_accountModel');  
    const fixed_deposit_planModel = await require('./fixed_deposit_planModel');  
    const fixed_depositModel = await require('./fixed_depositModel');  
    const loan_arrearModel = await require('./loan_arrearModel');  
    const loan_installment_bankModel = await require('./loan_installment_bankModel');  
    const loan_typeModel = await require('./loan_typeModel');  
    const loanModel = await require('./loanModel');  
    const online_loanModel = await require('./online_loanModel');  
    const online_transactionModel = await require('./online_transactionModel');  
    const requested_loanModel = await require('./requested_loanModel');  
    const saving_accountModel = await require('./saving_accountModel');  
    const savings_account_planModel = await require('./savings_account_planModel');  
    const transaction_detailModel = await require('./transaction_detailModel');  
}


module.exports = initModels;