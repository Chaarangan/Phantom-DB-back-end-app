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

// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken});
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

module.exports = router;