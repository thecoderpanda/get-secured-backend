import mongoose from "mongoose";
import User from "../models/User.js";
import validateLoginInput from "../validation/login.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";


export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  if (!emailRegex.test(req.body.email)) {
    errors.message = "Email is invalid !";
    return res.status(504).json(errors);
  }

  if (!req.body.password || req.body.password === "") {
    errors.message = "Password is invalid !"
    return res.status(504).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.message = "Email already exists";
      return res.status(504).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      Profile.findOne({ user: newUser._id }).then(profile => {
        if (profile) {
          errors.message = "Profile already exists";
          return res.status(504).json(errors);
        } else {
          const newProfile = new Profile({
            user: newUser._id,
            avatar: avatar
          });
          newProfile.save();
        }
      });

      emailclient.sendsignupemail(req.body.first_name, req.body.email)

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then()
            .catch(err => console.log(err));
        });
      });
      //Create jt payload
      const payload = {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        role: newUser.role
      };


      try {
        mixpanelcore.alias(newUser.id, newUser.email)
        mixpanelcore.people.set(newUser.email, {
          $first_name: newUser.first_name,
          $last_name: newUser.last_name,
          $email: newUser.email,
          $distinct_id: newUser.email,
        })

        mixpanelcore.track('RegisterServerSide', {
          $first_name: newUser.first_name,
          $last_name: newUser.last_name,
          $Email: newUser.email,
          $distinct_id: newUser.email
        })

      }
      catch (error) {
        res.status(403).send("Something went wrong")
        console.log(error)
      }



      //Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) console.log(err);
          res.json({
            success: true,
            token: "Bearer " + token,
            user: newUser
          });
        }
      );
    }
  });


}
export const login = async (req, res) => {
  const secretOrKey = "secret";
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(200).json({ message: "Invalid Email ID / password" });
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Match

        //Create jt payload
        const payload = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        };
        //Sign token
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              first_name: user.first_name,
              last_name: user.last_name,
              user_id: user._id
            });
          }
        );
      } else {
        return res.status(200).json({ message: "Password incorrect" });
      }
    });
  });
};
