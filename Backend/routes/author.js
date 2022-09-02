const express = require("express");
const router = express.Router();
const user = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const jwt_secret_string = "rahul is a good boy @#$ papa is my hero";

// my first route
router.post(
  "/createuser",
  [
    body("Name", "enter a valid name").isLength({ min: 7 }),
    body("Email", "enter a valid email").isEmail(),
    body("Password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //   const mydata = new user(req.body);
    //   mydata.save();
    //   console.log(mydata); // console.log(req.body);
    //   res.send(mydata); // res.send(req.body);//res.send("hello");
    const errors = validationResult(req);
    let message = false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let username = await user.findOne({ email: req.body.Email });

      if (username) {
        return res.status(400).json({
          success: message,
          error: "sorry this email already exist,try again !",
        });
      }

      let salt = await bcrypt.genSalt(10);
      let myhashpassword = await bcrypt.hash(req.body.Password, salt);

      let myuser = await user.create({
        name: req.body.Name,
        age: req.body.Age,
        email: req.body.Email,
        telephone: req.body.Telephone,
        password: myhashpassword,
      });
      // .then((user2) => res.json(user2))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({
      //     err: "enter correct value",
      //     message: err.message,
      //   });
      // });

      // console.log(myuser);
      // res.json(myuser);

      const data = {
        user: {
          id: myuser.id,
        },
      };

      // console.log(data);

      const token = jwt.sign(data, jwt_secret_string);
      // console.log(token);
      message = true;
      res.json({ success: message, token: token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// my second route
router.post(
  "/login",
  [
    body("Email2", "enter a valid email").isEmail(),
    body("Password2", "password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let message = false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { Email2, Password2 } = req.body;
      // console.log(Email2, Password2);
      const mymail = await user.findOne({ email: Email2 });
      // console.log(mymail);
      if (!mymail) {
        return res
          .status(400)
          .json({ success: message, error: "Pls enter correct credentials" });
      }

      const passwordcompare = await bcrypt.compare(Password2, mymail.password);

      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success: message, error: "Pls enter correct credentials" });
      }

      const data = {
        user: {
          id: mymail.id,
        },
      };

      // console.log(data);

      const token = jwt.sign(data, jwt_secret_string);
      // console.log(token);
      message = true;
      res.json({ success: message, token: token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//my third route
router.post("/getuser", fetchuser, async (req, res) => {
  let success = false;
  try {
    const userid = req.myolduser.id;
    const mycompleteuser = await user.findById(userid).select("-password");
    success = true;
    res.status(200).json({ message: success, userdetails: mycompleteuser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
