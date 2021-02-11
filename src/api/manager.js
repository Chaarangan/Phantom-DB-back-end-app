const router = require("express").Router();
const {
    verifyToken,
    isManager
} = require("../services/auth/jwt");
const {
    login,
    logout
} = require("../services/auth/manager");
const {
    updateProfile,
    getClerks,
    getClerkById
} = require("../services/employee/manager");
const {
    getBranches
} = require("../services/branch");



// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken});
});

router.get("/logout", verifyToken, isManager, logout);

router.put("/profile", verifyToken, isManager, updateProfile, async(req, res) => {
    res.status(200).json({response: req.message});
});

router.get("/clerks", verifyToken, isManager, getClerks, async(req, res) => {
    res.status(200).json({response: req.clerks});
});

router.get("/clerks/:clerk_id", verifyToken, isManager, getClerkById, async(req, res) => {
    res.status(200).json({response: req.clerk});
});

// ========= Branches ======= //
router.get("/branches", verifyToken, isManager, getBranches, async(req, res) => {
    res.status(200).json({response: req.branches});
});




module.exports = router;