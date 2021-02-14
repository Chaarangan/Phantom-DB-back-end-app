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
    getLoanTransactions
} = require("../services/transaction");
const {
    getRequestedLoans,
    approveLoanRequest,
    getBankVisitLoans,
    getLoans,
    getOnlineLoans,
} = require("../services/loan");


// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken, user: req.foundUser});
});

router.get("/logout", verifyToken, isClerk, logout);

// ========= Accounts ======= //
router.get("/accounts", verifyToken, isClerk, getAccounts, async(req, res) => {
    res.status(200).json({response: req.accounts});
});

// ========= Branches ======= //
router.get("/branches", getBranches, async(req, res) => {
    res.status(200).json({response: req.branches});
});

// ========= Transactions ======= //
router.get("/transactions/bank", verifyToken, isClerk, getBankTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions});
});
router.get("/transactions/atm", verifyToken, isClerk, getATMTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions});
});
router.get("/transactions/online", verifyToken, isClerk, getOnlineTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions});
});
router.get("/transactions/loan", verifyToken, isClerk, getLoanTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions});
});


// ========= Loans ======= //
router.get("/loans/requested", verifyToken, isClerk, getRequestedLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});

router.put("/loans/requested/:request_id", verifyToken, isClerk, approveLoanRequest, async(req, res) => {
    res.status(200).json({response: req.message});
});

router.get("/loans/bank-visit-loans", verifyToken, isClerk, getBankVisitLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});

router.get("/loans", verifyToken, isClerk, getLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});

router.get("/loans/online", verifyToken, isClerk, getOnlineLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});

module.exports = router;