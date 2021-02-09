const router = require("express").Router();

const {
    getBranches
} = require("../services/branch");



// ========= Branches ======= //
router.get("/branches", getBranches, async(req, res) => {
    res.json({"Branches": req.branches});
});

module.exports = router;