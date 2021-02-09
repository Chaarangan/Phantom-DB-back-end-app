const router = require("express").Router();

const {
    createEmployee
} = require("../services/employee");



// ========= Branches ======= //
router.post("/employees/new", createEmployee, async(req, res) => {
    res.json({"response": req.message});
});

module.exports = router;