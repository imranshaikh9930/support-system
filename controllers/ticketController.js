const Ticket = require("../models/ticketModel");
const Reply = require("../models/replyModel");
const { createGitHubIssue } = require("../utils/githubApi");

exports.createTicketForm = (req, res) => {
  res.render("create-ticket");
};

exports.createTicket = async (req, res) => {
  const { title, description, category } = req.body;

  // console.log(title,description,category);

  try {
    const githubIssue = await createGitHubIssue(title, description);

    // console.log(githubIssue);
    const ticket = new Ticket({
      title,
      description,
      category,
      customer: req.user.id,
      githubIssueUrl: githubIssue.html_url,
    });

    await ticket.save();

    // res.status(201).json({message:"Ticket created Successfully"});

    res.redirect("/ticket/my-tickets");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myTickets = async (req, res) => {
  const tickets = await Ticket.find({ customer: req.user.id }).sort({
    createdAt: -1,
  });
  // res.json(tickets);
  res.render("my-tickets", { tickets });
};

exports.viewSingleTickets = async (req, res) => {
  const ticket = await Ticket.findOne({
    _id: req.params.id,
    customer: req.user.id,
  });

  const replies = await Reply.find({ ticket: ticket._id }).populate(
    "user",
    "name roles"
  );

  // res.json({ticket,replies});

  res.render("ticket-details", { ticket, replies });
};
