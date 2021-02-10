const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const bcrypt=require("bcrypt");
const config = require("../../config/index");
var jwt = require("jsonwebtoken");


const login = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employee_logins WHERE username = ?", {replacements: [req.body.username]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {
                        const   employee_id = foundUser[0][0].employee_id,
                                password = foundUser[0][0].password;
                        
                        if (!(await bcrypt.compare(req.body.password, password))) {
                            res.status(401).json({ accessToken: null, status: "error", message: 'Incorrect Password!'});
                        }
                        else{
                            await sequelize.query("SELECT * FROM admins WHERE employee_id = ?", {replacements: [employee_id]}).then(
                                async (foundUser) => {
                                    if (foundUser[0].length != 0) {
                                        var token = jwt.sign({ id: foundUser[0][0].employee_id }, config.secret, {
                                            expiresIn: 86400 // 24 hours
                                        });
                                        req.accessToken = token;
                                        req.message = "Sucessfully Logged In!";
                                        next();                                               
                                    }
                                    else{
                                        return res.status(404).json({ response : "No Admin found with this username!" });
                                    }
                                                    
                                }
                            );
                        }                                
                    }
                    catch (e){
                        console.log(e);
                        next(ApiError.badRequest());
                    }
                }
                else {
                    return res.status(404).json({ response : "No Admin found with this username!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};

module.exports = { login };