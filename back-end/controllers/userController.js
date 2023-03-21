const User = require("../models/User")

exports.read = async(req, res, next) => {
  const { user_id: id } = req
  try {const user = await User.findById(id)
    if(user)
    {
      res.status(200).json({
        message:"Get user",
        user
      })
    }
    else
    {
      return res.status(400).json({ message: 'User not found' })
    }
  } catch(error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    })
  } 
}

exports.update = async (req, res, next) => {
  const { user_id: id} = req;
  const { name, surname, email, mobile_number } = req.body;

  if (name || surname || email || mobile_number) {
    // Finds the user with the id

    await User.findById(id)
    .then((user) => {
        user.name = name ? name : user.name
        user.surname = surname ? surname : user.surname
        user.email = email ? email : user.email
        user.mobile_number = mobile_number ? mobile_number : user.mobile_number

        user.save((err) => {
          //Monogodb error checker
          if (err) {
            console.log(22222222222);
            return res
              .status(400)
              .json({ message: "An error occurred", error: err.message });
          }
          res.status(201).json({ message: "Update successful", user });
        });
      })
      .catch((error) => {
        console.log(3333);
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      });
  } else {
    res.status(400).json({ message: "First name or Id not present" });
  }
};


exports.deleteUser = async (req, res, next) => {
  const { user_id: id } = req;
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

// to do delete boards

