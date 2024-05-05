const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("./emailclient");
const crypto = require("crypto");
let express = require("express");
let coursemodel = require("../models/Course");
//const bcrypt = require("bcrypt");

async  function forgetpassword(email, userid, first_name) {
 const user = await User.findOne({email: email});
 if(!user) {
   return {status: 404, message: "User not found"};
 }
 else{
  let token = await Token.findOne({userId: user._id});
  if(token) {
    await token.deleteOne();
  }
  let resetToken = crypto.randomBytes(32).toString("hex");
 }

}

async function getuserrole(userid) {
  try {
    const userId = userid;
    const user = await User.findById(userId);
    console.log(user.role);
    return user.role;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function adminusercheck(userid, role) {
  console.log(userid);
  console.log(role);
  if(role =="admin") {
    next();
  }
  else {
    return "unauthorized error"
  }
}


module.exports = {forgetpassword, getuserrole, adminusercheck};