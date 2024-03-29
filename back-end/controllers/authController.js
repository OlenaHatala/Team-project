require("dotenv").config();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');

exports.register = async (req, res, next) => {

  const { name, surname, mobile_number, email, password } = req.body
  if (password.length < 8) {
    return res.status(400).json({ message: "Password less than 8 characters" })
  }
  const email_user = await User.findOne({ email})
  if(email_user){
    return res.status(409).json({ message: "This email has been used already" })
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      name,
      surname,
      email,
      password: hash,
      mobile_number,
      taken_tickets: [],
      created_tables: [],
      membered_tables: []
    })
      .then((user) =>
        res.status(200).json({
          message: "User created successfully",
            user,
        })
      )
      .catch ((error) =>
        res.status(400).json({
          message: "User was not created",
          error: error.message,
        })
      );
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  // Check if email and password is provided
  if (!email && !password) {
    return res.status(400).json({
      message: "Email and Password not present",
    })
  }

  else if (!email) {
    return res.status(400).json({
      message: "Email not present",
    });
  }

  else if (!password) {
    return res.status(400).json({
      message: "Password not present",
    });
    
  } 
  
  try {
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      res.status(401).json({
        message: `${email} account was not found`,
      })
    } else {
      bcrypt.compare(password, foundUser.password).then(function (result) 
      {
        if (result) {
          const accessToken = jwt.sign(
            {
              "UserInfo": {
                "_id": foundUser._id,
                "name": foundUser.name,
                "surname": foundUser.surname,
                "mobile_number": foundUser.mobile_number,
                "email": foundUser.email,
                "password": foundUser.password,
                "taken_tickets": foundUser.taken_tickets,
                "created_tables": foundUser.created_tables,
                "membered_tables": foundUser.membered_tables
              }
            },
        
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: `${process.env.ACCESS_TOKEN_DURATION}`}
          )
        
          const refreshToken = jwt.sign(
            { "email": foundUser.email, "password": foundUser.password},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: `${process.env.REFRESH_TOKEN_DURATION}` }
          )
        
            const age = +((process.env.REFRESH_TOKEN_DURATION).slice(0, -1));

          res.cookie('jwt', refreshToken, {
            secure: true,
            sameSite: 'None',
            httpOnly: true,
            maxAge: age * 24 * 60 * 60 * 1000
          })

          res.status(200).json({
            message: "Login successful",
            user: foundUser,
            accessToken: accessToken,
          })
        }
        else {
          res.status(401).json({ message: "Incorrect password" })
        }
      })
    }
  }  catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    })
  }
};

exports.refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })
    
      const foundUser = await User.findOne({ email: decoded.email }).exec()

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "_id": foundUser._id,
            "name": foundUser.name,
            "surname": foundUser.surname,
            "mobile_number": foundUser.mobile_number,
            "email": foundUser.email,
            "password": foundUser.password,
            "taken_tickets": foundUser.taken_tickets,
            "created_tables": foundUser.created_tables,
            "membered_tables": foundUser.membered_tables
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: `${process.env.ACCESS_TOKEN_DURATION}`}
      )

      res.json({ accessToken })
    })
  )
}

exports.logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}
