const User = require("../models/User")
const Ticket = require('../models/Ticket')
const Board = require('../models/Board')

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
            return res
              .status(400)
              .json({ message: "An error occurred", error: err.message });
          }
          res.status(201).json({ message: "Update successful", user });
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
  const { user_id: id } = req;

  const user = await User.findById(id);

  const taken_tickets = user.taken_tickets
  for(tick in taken_tickets)
  {
    const found_ticket = await Ticket.findById(taken_tickets[tick]) 
    if(found_ticket.user_id && found_ticket.user_id.toString() === id.toString()){
      await Ticket.findByIdAndUpdate(
        found_ticket._id, {user_id : null}
      );
    }
  } 

  const membered_tables_ = user.membered_tables;
  for(board_id in membered_tables_)
  {
    const board = await Board.findById(membered_tables_[board_id]) 
    
    let members_ = board.members.filter(requested_id => {
      return requested_id.toString() != id.toString() 
    })
    await Board.findByIdAndUpdate(
      membered_tables_[board_id], {members : members_}
    );
  } 
  const boards = await Board.find().exec();
        
    for (const board of boards) {
      const board_ = await Board.findById(board._id) 
      let requests_ = board_.requests.filter(requested_id => {
        return requested_id.toString() != id.toString() 
      })

      await Board.findByIdAndUpdate(
        board_._id, {requests : requests_}
      );
    }
    

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

