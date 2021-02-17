const router = require("express").Router();

const { 
    verifyToken,
    isCustomer
} = require("../services/auth/jwt.js");
const {
    login,
    logout
} = require("../services/auth/customer.js");
const {
    getCustomerAccounts
} = require("../services/account");
const {
    createCustomerTransaction,
    getCustomerTransactionsByAccount
} = require("../services/transaction");

// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken, user: req.foundUser, status : 200});
});

router.get("/logout", verifyToken, isCustomer, logout);

// ========= Accounts ======= //
router.get("/accounts", verifyToken, isCustomer, getCustomerAccounts, async(req, res) => {
    res.status(200).json({response: req.accounts, status : 200});
});

// ========= Transactions ======= //
router.post("/transactions", verifyToken, isCustomer, getCustomerTransactionsByAccount, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.post("/transactions/new", verifyToken, isCustomer, createCustomerTransaction, async(req, res) => {
    res.status(200).json({response: req.message, status : 200});
});

module.exports = router;