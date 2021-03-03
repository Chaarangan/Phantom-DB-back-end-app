const sequelize = require("../../helpers/sequelizer");
const date = require('date-and-time');
const now = new Date();


const withdrawAtm = async (req, res, next) => {
    try {
        const amount = req.body.amount,
            atm_id = req.body.atm_id,
            branch_id = req.body.branch_id,
            account_no = req.body.account_no;

        await sequelize.query("CALL makeAtmTransaction(" + account_no + ", " + atm_id + ", " + amount + ", " + branch_id + ");").then(
            async (results) => {
                if(results[0].OK == "OK"){
                    req.message = "Success";
                    next();
                }
                else{
                    return res.status(400).json({ status: 400, response: "Bad Request!" });
                }
            });

    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, response: "Bad Request!" });
    }
};



module.exports = { withdrawAtm }