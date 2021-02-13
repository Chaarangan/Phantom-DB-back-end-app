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
    getTransactions,
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

router.get("/logout", verifyToken, isManager, logout);

router.put("/profile", verifyToken, isManager, updateProfile, async(req, res) => {
    res.status(200).json({response: req.message});
});


// ========= Clerks ======= //
router.get("/clerks", verifyToken, isManager, getClerks, async(req, res) => {
    res.status(200).json({response: req.clerks});
});

router.get("/clerks/:clerk_id", verifyToken, isManager, getClerkById, async(req, res) => {
    res.status(200).json({response: req.clerk});
});

router.put("/clerks/:clerk_id", verifyToken, isManager, updateClerkById, async(req, res) => {
    res.status(200).json({response: req.clerk});
});

// ========= Branches ======= //
router.get("/branches", verifyToken, isManager, getBranches, async(req, res) => {
    res.status(200).json({response: req.branches});
});

// ========= Accounts ======= //
router.get("/accounts", verifyToken, isManager, getAccounts, async(req, res) => {
    res.status(200).json({response: req.accounts});
});

// ========= Transactions ======= //
router.get("/transactions", verifyToken, isManager, getTransactions, async(req, res) => {
    res.status(200).json({response: req.transactions});
});

// ========= Loans ======= //
router.get("/loans/requested", verifyToken, isManager, getRequestedLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});

router.put("/loans/requested/:request_id", verifyToken, isManager, approveLoanRequest, async(req, res) => {
    res.status(200).json({response: req.message});
});

router.get("/loans/bank-visit-loans", verifyToken, isManager, getBankVisitLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});

router.get("/loans", verifyToken, isManager, getLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});

router.get("/loans/online", verifyToken, isManager, getOnlineLoans, async(req, res) => {
    res.status(200).json({response: req.loans});
});


module.exports = router;