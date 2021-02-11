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
} = require("../services/employee/manager/clerk");
const {
    getBranches
} = require("../services/branch");
const {
    createAccount,
} = require("../services/employee/manager/account");



// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken});
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
router.post("/accounts/new", verifyToken, isManager, createAccount, async(req, res) => {
    res.status(200).json({response: req.message});
});



module.exports = router;