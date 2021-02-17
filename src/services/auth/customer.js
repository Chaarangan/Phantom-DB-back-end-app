const sequelize = require("../../helpers/sequelizer");
const bcrypt = require("bcrypt");
const config = require("../../config/index");
var jwt = require("jsonwebtoken");
const date = require('date-and-time');
const now = new Date();

const login = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM customer_logins WHERE username = ?", { replacements: [req.body.username] }).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {
                        const customer_id = foundUser[0][0].customer_id,
                            password = foundUser[0][0].password;

                        if (!(await bcrypt.compare(req.body.password, password))) {
                            return res.status(401).json({ status: "error", message: 'Incorrect Password!', status : 401 });
                        }
                        else {
                            await sequelize.query("SELECT customer_id, first_name, last_name, nic, dob, getGender(gender) as gender FROM individuals WHERE customer_id = ?", { replacements: [customer_id] }).then(
                                async (foundUser) => {
                                    if (foundUser[0].length != 0) {
                                        var token = jwt.sign({ user: foundUser[0][0] }, config.secret, {
                                            expiresIn: 86400 // 24 hours
                                        });
                                        req.accessToken = token;
                                        req.foundUser = foundUser[0][0];
                                        req.message = "Sucessfully Logged In!";
                                        next();
                                    }
                                    else {
                                        return res.status(404).json({ response: "No Customer found with this username!", status : 404 });
                                    }

                                }
                            );
                        }
                    }
                    catch (e) {
                        console.log(e);
                        return res.status(400).json({status: 400, response: "Bad Request!"});
                    }
                }
                else {
                    return res.status(404).json({ response: "No Cusomter found with this username!" , status : 404});
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }

};

const logout = async (req, res, next) => {
    try {
        await sequelize.query("UPDATE customer_logins SET last_login = ? WHERE customer_id = ?",
            {
                replacements: [date.format(now, 'YYYY-MM-DD HH:mm:ss'), req.user.customer_id]
            });
        return res.status(200).json({ accessToken: null, response: 'Loggedout Successfully!', user: null , status : 200});
    } catch (e) {
        console.log(e);
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

module.exports = { login, logout };