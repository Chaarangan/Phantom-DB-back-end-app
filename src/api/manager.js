const router = require("express").Router();
const {
    verifyToken,
    isManager
} = require("../services/auth/jwt");
const {
    login
} = require("../services/auth/manager");
const {
    getBranches
} = require("../services/branch");



// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.json({"response": req.message, accessToken : req.accessToken});
});

// ========= Branches ======= //
router.get("/branches", verifyToken, isManager, getBranches, async(req, res) => {
    res.json({"Branches": req.branches});
});

module.exports = router;