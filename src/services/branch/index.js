const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const branch = require("../../models/branch");

const getBranches = async(req, res, next) => {
    try {
        const branches = await sequelize.query("SELECT * FROM `branches`");
        req.branches = branches;
        next();
    } catch (e) {
        next(ApiError.badRequest());
    }
};

const getBranchById = async(req, res, next) => {
    try {
        const branch = await sequelize.query("SELECT * FROM branches WHERE branch_id = ?", {
            replacements : [req.params.branch_id]
        });
        req.branch = branch;
        next();
    } catch (e) {
        next(ApiError.badRequest());
    }
};


module.exports = { getBranches, getBranchById};