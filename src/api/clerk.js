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
    getBankTransactions,
    getATMTransactions,
    getOnlineTransactions,
    getLoanTransactions
} = require("../services/transaction");

// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken, user: req.foundUser});
});

router.get("/logout", verifyToken, isClerk, logout);

// ========= Accounts ======= //
// router.post("/accounts/new", createAccount, async(req, res) => {
//     res.json({"response": req.message});
// });

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

module.exports = router;