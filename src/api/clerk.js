const router = require("express").Router();

const {
    login,
    logout
} = require("../services/auth/clerk.js");
const { 
    verifyToken,
    isClerk 
} = require("../services/auth/jwt.js");
const {
    getBranches
} = require("../services/branch");
const {
    getAccounts
} = require("../services/account");
const {
    getBankTransactions,
    getATMTransactions,
    getOnlineTransactions,
    getLoanTransactions,
    createTransaction
} = require("../services/transaction");
const {
    getRequestedLoans,
    getBankVisitLoans,
    getLoans,
    getOnlineLoans,
    getRejectedLoans
} = require("../services/loan");


// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken, user: req.foundUser, status : 200});
});

router.get("/logout", verifyToken, isClerk, logout);

// ========= Accounts ======= //
router.get("/accounts", verifyToken, isClerk, getAccounts, async(req, res) => {
    res.status(200).json({response: req.accounts, status : 200});
});

// ========= Branches ======= //
router.get("/branches", getBranches, async(req, res) => {
    res.status(200).json({response: req.branches, status : 200});
});

// ========= Transactions ======= //
router.get("/transactions/bank", verifyToken, isClerk, getBankTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.get("/transactions/atm", verifyToken, isClerk, getATMTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.get("/transactions/online", verifyToken, isClerk, getOnlineTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.get("/transactions/loan", verifyToken, isClerk, getLoanTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.get("/transactions/new", verifyToken, isClerk, createTransaction, async(req, res) => {
    res.status(200).json({response: req.message, status : 200});
});


// ========= Loans ======= //
router.get("/loans/requested", verifyToken, isClerk, getRequestedLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.get("/loans/bank-visit-loans", verifyToken, isClerk, getBankVisitLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.get("/loans/rejected", verifyToken, isClerk, getRejectedLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.get("/loans", verifyToken, isClerk, getLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.get("/loans/online", verifyToken, isClerk, getOnlineLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

module.exports = router;