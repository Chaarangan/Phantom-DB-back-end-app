const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const branch = require("../../models/branch");

const getBranches = async(req, res, next) => {
    try {
        const branches = await branch.findAll();
        req.branches = branches;
        next();
    } catch (e) {
        next(ApiError.badRequest());
    }
};


module.exports = {
    getBranches,
};