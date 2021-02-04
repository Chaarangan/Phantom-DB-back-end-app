const router = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../services/authService");

const {
    login, 
    logout,
    createAccount
} = require("../services/authService");



// ========= user is ok ======= //
router.post("/login", login, async(req, res) => {
    res.json("OK");
});
router.post('/register', createAccount, async(req, res) => {
    res.json({ msg : "Success" });
});
router.get('/logout', auth.isLoggedIn, logout, async(req, res) => {
    res.json({ msg : "Success" });
});
// ========= user is ok ======= //


module.exports = router;