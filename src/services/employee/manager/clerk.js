const sequelize = require("../../../helpers/sequelizer");
const ApiError = require('../../../helpers/ApiError');

const getClerks = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE ((employee_id IN (SELECT * FROM clerks)) and (branch_id = ?))", {replacements: [req.user.branch_id]}).then(
            async (foundUsers) => {
                if (foundUsers[0].length != 0) {                   
                    req.clerks = foundUsers;
                    next();
                }
                else {                   
                    return res.status(404).json({ response : "No Clerks found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};

const getClerkById = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE (employee_id = ? and branch_id = ? and (employee_id in (SELECT * FROM clerks)))", {replacements : [req.params.clerk_id, req.user.branch_id]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) {                   
                    req.clerk = foundUser;
                    next();
                }
                else {
                    return res.status(404).json({ response : "No Clerk found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }

};


const updateClerkById = async (req, res, next) => {
    try {
        await sequelize.query("SELECT * FROM employees WHERE (employee_id = ? and branch_id = ? and (employee_in IN (SELECT * FROM clerks)))", {replacements : [req.params.clerk_id, req.user.branch_id]}).then(
            async (foundUser) => {
                if (foundUser[0].length != 0) { 
                    try {
                        const   status = req.body.status;
                        
                        await sequelize.query("UPDATE employees SET status = ? WHERE employee_id = ?",
                            {
                                replacements : [ status, req.params.clerk_id]
                            });                        

                        req.message = "Updated Sucessfully!";
                        next();

                    } catch (e) {
                        console.log(e);
                        next(ApiError.badRequest());
                    }              
                }
                else {
                    return res.status(404).json({ response : "No Clerk found!" });
                }
            }
        );
    } catch (e) {
        console.log(e);
        next(ApiError.badRequest());
    }
};


module.exports = { getClerks, getClerkById, updateClerkById }