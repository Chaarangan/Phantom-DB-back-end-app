const router = require("express").Router();
const {
    verifyToken,
    isManager
} = require("../services/auth/jwt");
const {
    login,
    logout,
    updateProfile
} = require("../services/auth/manager");
const {
    getClerks,
    getClerkById,
    updateClerkById,
} = require("../services/employee/clerk");
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
    rejectLoanRequest,
    getRejectedLoans
} = require("../services/loan");



// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken, user: req.foundUser, status : 200});
});

router.get("/logout", verifyToken, isManager, logout);

router.put("/profile", verifyToken, isManager, updateProfile, async(req, res) => {
    res.status(200).json({response: req.message, status : 200});
});


// ========= Clerks ======= //
router.get("/clerks", verifyToken, isManager, getClerks, async(req, res) => {
    res.status(200).json({response: req.clerks, status : 200});
});

router.get("/clerks/:clerk_id", verifyToken, isManager, getClerkById, async(req, res) => {
    res.status(200).json({response: req.clerk, status : 200});
});

router.put("/clerks/:clerk_id", verifyToken, isManager, updateClerkById, async(req, res) => {
    res.status(200).json({response: req.clerk, status : 200});
});

// ========= Branches ======= //
router.get("/branches", verifyToken, isManager, getBranches, async(req, res) => {
    res.status(200).json({response: req.branches, status : 200});
});

// ========= Accounts ======= //
router.get("/accounts", verifyToken, isManager, getAccounts, async(req, res) => {
    res.status(200).json({response: req.accounts, status : 200});
});

// ========= Transactions ======= //
router.get("/transactions/bank", verifyToken, isManager, getBankTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.get("/transactions/atm", verifyToken, isManager, getATMTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.get("/transactions/online", verifyToken, isManager, getOnlineTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});
router.get("/transactions/loan", verifyToken, isManager, getLoanTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions, status : 200});
});

// ========= Loans ======= //
router.get("/loans/requested", verifyToken, isManager, getRequestedLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.put("/loans/requested/:loan_id", verifyToken, isManager, approveLoanRequest, async(req, res) => {
    res.status(200).json({response: req.message, status : 200});
});

router.put("/loans/rejected/:loan_id", verifyToken, isManager, rejectLoanRequest, async(req, res) => {
    res.status(200).json({response: req.message, status : 200});
});

router.get("/loans/rejected", verifyToken, isManager, getRejectedLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.get("/loans/bank-visit-loans", verifyToken, isManager, getBankVisitLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.get("/loans", verifyToken, isManager, getLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});

router.get("/loans/online", verifyToken, isManager, getOnlineLoans, async(req, res) => {
    res.status(200).json({response: req.loans, status : 200});
});


module.exports = router;