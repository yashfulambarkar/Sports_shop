const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save user in DB"
        });
      }
      res.json({
        name: user.name,
        email: user.email,
        id: user._id
      });
    });
  };

  exports.signin = (req, res) => {
    // const errors = validationResult(req);
     const { email, password } = req.body;
   
   //   if (!errors.isEmpty()) {
   //     return res.status(422).json({
   //       error: errors.array()[0].msg
   //     });
   //   }
   
     User.findOne({ email }, (err, user) => {
       if (err || !user) {
         return res.status(400).json({
           error: "USER email does not exists"
         });
       }
   
       if (!user.autheticate(password)) {
         return res.status(401).json({
           error: "Email and password do not match"
         });
       }
   
       // //create token
       // const token = jwt.sign({ _id: user._id }, process.env.SECRET);
       // //put token in cookie
       // res.cookie("token", token, { expire: new Date() + 9999 });
   
       //send response to front end
       const { _id, name, email } = user;
       return res.json({  user: { _id, name, email } });
     });
   }

   exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "User not found in DB"
        });
      }
      req.user = user;
      next();
    });
  };
  
  
  exports.getUser = (req, res) => {
    return res.json(req.user);
  };
  
  exports.updateUser = (req, res) => {

        const user = req.user;
       
        user.name = req.body.name;
        user.email = req.body.email;
      
        user.save((err, updatedUser) => {
          if (err) {
            return res.status(400).json({
              error: "Failed to update user"
            });
          }
          res.json(updatedUser);
        });
      };
      
      exports.removeUser = (req, res) => {
       
       
        const user = req.user;
      
        user.remove((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Failed to delete this user"
            });
          }
          res.json({
            message: "Successfull deleted"
          });
        });
      };


