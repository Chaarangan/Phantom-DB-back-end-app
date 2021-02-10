const router = require("express").Router();

const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployeeById,
    sendRandomPassword
} = require("../services/employee");

const {
    getBranches,
    getBranchById,
} = require("../services/branch");



// ========= Employees ======= //
router.post("/employees/new", createEmployee, async(req, res) => {
    res.json({"response": req.message});
});

router.get("/employees/", getEmployees, async(req, res) => {
    res.json({"response": req.employees});
});

router.get("/employees/:employee_id", getEmployeeById, async(req, res) => {
    res.json({"response": req.employee});
});

router.put("/employees/:employee_id", updateEmployeeById, async(req, res) => {
    res.json({"response": req.message});
});

router.get("/employees/:employee_id/random-password", sendRandomPassword, async(req, res) => {
    res.json({"response": req.message});
});


// ========= Branches ======= //
router.get("/branches", getBranches, async(req, res) => {
    res.json({"response": req.branches});
});

router.get("/branches/:branch_id", getBranchById, async(req, res) => {
    res.json({"response": req.branch});
});

module.exports = router;