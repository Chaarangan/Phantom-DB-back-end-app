const sequelize = require("../../helpers/sequelizer");

const getBranches = async(req, res, next) => {
    try {
        const branches = await sequelize.query("SELECT branch_id, getBranch(branch_id) as branch_name, location, getStatus(is_active) as status FROM `branches`");
        req.branches = branches;
        next();
    } catch (e) {
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};

const getBranchById = async(req, res, next) => {
    try {
        const branch = await sequelize.query("SELECT branch_id, getBranch(branch_id) as branch_name, location, getStatus(is_active) as status FROM branches WHERE branch_id = ?", {
            replacements : [req.params.branch_id]
        });
        req.branch = branch;
        next();
    } catch (e) {
        return res.status(400).json({status: 400, response: "Bad Request!"});
    }
};


module.exports = { getBranches, getBranchById};