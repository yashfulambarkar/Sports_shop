var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signup,signin,getUserById,getUser,updateUser,removeUser } = require("../controllers/user");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.param("userId", getUserById);
router.get("/user/:userId", getUser);
//update
router.put(
  "/user/:userId",
 
  updateUser
);

router.delete(
  "/user/:userId",

  removeUser
);



//router.get("/signout", signout);

module.exports = router;