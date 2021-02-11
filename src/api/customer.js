const router = require("express").Router();

const {
    login,
    logout
} = require("../services/auth/customer.js");

// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.status(200).json({response: req.message, accessToken : req.accessToken});
});

router.get("/logout", logout);

module.exports = router;