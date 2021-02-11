const router = require("express").Router();

const { 
    verifyToken,
    isCustomer
} = require("../services/auth/jwt.js");
const {
    login,
    logout
} = require("../services/auth/customer.js");

// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken});
});

router.get("/logout", verifyToken, isCustomer, logout);

module.exports = router;