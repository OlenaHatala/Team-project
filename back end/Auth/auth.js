const User = require("../model/User")

exports.register = async (req, res, next) => {
  const { name, surname, email, password, mobile_number } = req.body
  if (password.length < 8) {
    return res.status(400).json({ message: "Password less than 8 characters" })
  }
  try {
    await User.create({
      name,
      surname,
      email,
      password,
      mobile_number,
    }).then(user =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: error.message,
    })
  }
}

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
    const user = await User.findOne({ email, password })
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}

exports.update = async (req, res, next) => {
  const { name, id } = req.body;
  // Verifying if name and id is presnt
  if (name && id) {
    // Finds the user with the id
    await User.findById(id)
    .then((user) => {
        user.name = name;
        user.save((err) => {
          //Monogodb error checker
          if (err) {
            return res
              .status("400")
              .json({ message: "An error occurred", error: err.message });
            process.exit(1);
          }
          res.status("201").json({ message: "Update successful", user });
        });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      });
  } else {
    res.status(400).json({ message: "First name or Id not present" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.remove())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
  