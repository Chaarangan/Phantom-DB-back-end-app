const sequelize = require("../../helpers/sequelizer");
const ApiError = require('../../helpers/ApiError');
const bcrypt = require("bcrypt");

const user = require("../../models/userModel");


const createAccount = async (req, res, next) => {
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
              level = 0;

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
                    status: 0
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
          return res.status(404).json({ emailnotfound: "NIC found" });
        }
      });
  } catch (e) {
    console.log(e);
    next(ApiError.badRequest());
  }
};


const login = async (req, res) => {
  // login logic here
  try {
    const nic = req.body.nic,
      password = req.body.password;

    if (!nic || !password) {
      return res.status(400).json({
        status: "error",
        error: 'Please provie an nic and password'
      })
    }
    else {
      await user.findOne({ where: { nic: nic } }).then(
        async (foundUser) => {
          if (!foundUser) {
            res.status(400).json({
              error: 'Cannot find the account'
            })
          }
          else {
            if (!(await bcrypt.compare(password, foundUser.password))) {
              //console.log(result);
              res.status(401).json({
                status: "error",
                message: 'nic or password incorrect!'
              });
            }
            else {
              req.session.id = foundUser.id;
              req.session.level = foundUser.level;
              res.status(200).json({
                id: foundUser.id,
                level: foundUser.level,                
                status: "success",
                message: "Loggedin Succesfully"
              });
            }
          }

        })
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res, next) => {
  // logout logic here
  req.session.id = "";
  req.session.level = "";
  req.session.destroy();
  next();
};


const isLoggedIn = (req,res,next)=>{
  if (req.session.level) {
    next();
  } else {
    res.status(401).json({message:"Please login first"});
  }
};




module.exports = { login, logout, createAccount, isLoggedIn};
