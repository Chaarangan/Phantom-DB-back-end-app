const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const bcrypt=require("bcrypt");
const user = sequelize.models.users;

const createUser = async (req, res, next) => {
    // sequalize logic goes here
  
    try {
      await user.findOne({ where: { nic: req.body.nic } }).then(
        async (foundUser) => {
          if (!foundUser) {
            try {
              const nic = req.body.nic,
                f_n = req.body.first_name,
                l_n = req.body.last_name,
                email = req.body.email,
                password = req.body.password,
                mob = req.body.mobile,
                level = req.body.level;
  
              await bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    // Create a new user and save to DB 
                    const newUser = user.create({
                      nic: nic,
                      first_name: f_n,
                      last_name: l_n,
                      email: email,
                      password: hash,
                      mobile: mob,
                      level: level,
                      created_on: Date.now(),
                      status: level
                    });
                    req.newUser = newUser;
                    next();
                  }
                });
              });
            } catch (e) {
              console.log(e);
              next(ApiError.badRequest());
            }
          }
          else {
            return res.status(404).json({ msg: "NIC found" });
          }
        });
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest());
    }
  };

module.exports = { getUsers, getUserById, createUser };