const router = require("express").Router();
const {
    verifyToken,
    isAdmin
} = require("../services/auth/jwt");
const {
    login,
    logout,
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployeeById,
    sendRandomPassword
} = require("../services/auth/admin");
const {
    getBranches,
    getBranchById,
} = require("../services/branch");



// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken});
});

router.get("/logout", logout);

// ========= Employees ======= //
router.post("/employees/new", verifyToken, isAdmin, createEmployee, async(req, res) => {
    res.status(200).json({response: req.message});
});

router.get("/employees/", verifyToken, isAdmin, getEmployees, async(req, res) => {
    res.status(200).json({response: req.employees});
});

router.get("/employees/:employee_id", verifyToken, isAdmin, getEmployeeById, async(req, res) => {
    res.status(200).json({response: req.employee});
});

router.put("/employees/:employee_id", verifyToken, isAdmin, updateEmployeeById, async(req, res) => {
    res.status(200).json({response: req.message});
});

router.get("/employees/:employee_id/random-password", verifyToken, isAdmin, sendRandomPassword, async(req, res) => {
    res.status(200).json({response: req.message});
});


// ========= Branches ======= //
router.get("/branches", getBranches, verifyToken, isAdmin, async(req, res) => {
    res.status(200).json({response: req.branches});
});

router.get("/branches/:branch_id", verifyToken, isAdmin, getBranchById, async(req, res) => {
    res.status(200).json({response: req.branch});
});

module.exports = router;