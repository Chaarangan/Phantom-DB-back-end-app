const router = require("express").Router();

const {
    login
} = require("../services/auth/clerk.js");
// const {
//     createAccount
// } = require("../services/account/index.js");
const {
    getBranches
} = require("../services/branch");

// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.json({"response": req.message});
});

// ========= Accounts ======= //
// router.post("/accounts/new", createAccount, async(req, res) => {
//     res.json({"response": req.message});
// });

// ========= Branches ======= //
router.get("/branches", getBranches, async(req, res) => {
    res.json({"Branches": req.branches});
});

module.exports = router;