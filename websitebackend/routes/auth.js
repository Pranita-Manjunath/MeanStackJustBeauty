var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signup,signin,updateUser,getAllUsers,getUserById,removeUser} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 }),
    check("phn","Phone Number should be exactly 10" ).isMobilePhone()
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

router.param("UserId", getUserById);
router.put("/auth/:UserId",updateUser);//update
router.delete("/auth/:UserId",removeUser);
router.get("/auth/Users",getAllUsers);
//router.get("/signout", signout);

module.exports = router;

 
