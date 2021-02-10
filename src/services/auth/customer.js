const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const bcrypt=require("bcrypt");

const login = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM customer_logins WHERE username = ?", {replacements: [req.body.username]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {
                    try {
                        const   customer_id = foundUser[0][0].customer_id,
                                password = foundUser[0][0].password;
                        
                        if (!(await bcrypt.compare(req.body.password, password))) {
                            res.status(401).json({ status: "error", message: 'Incorrect Password!'});
                        }
                        else{
                            var token = jwt.sign({ id: customer_id }, config.secret, {
                                expiresIn: 86400 // 24 hours
                            });
                            req.accessToken = token;
                            req.message = "Sucessfully Logged In!";
                            next();                                               
                        }                              
                    }
                    catch (e){
                        console.log(e);
                        next(ApiError.badRequest());
                    }
                }
                else {
                    return res.status(404).json({ response : "No Cusomter found with this username!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};

module.exports = { login };