const router = require("express").Router();

const {
    login
} = require("../services/auth/customer.js");

// ========= Auth ======= //
router.post("/login", login, async(req, res) => {
    res.json({"response": req.message, accessToken : req.accessToken});
});


module.exports = router;