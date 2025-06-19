const Ticket = require("../models/ticketModel");
const Reply = require("../models/replyModel");
const { closeGitHubIssue } = require("../utils/githubApi");

exports.viewAssignedTickets = async (req, res) => {
  const tickets = await Ticket.find({ assignedTo: req.user.id }).sort({
    createdAt: -1,
  });

  res.render("agent-assigned-tickets", { tickets });
};

exports.updateTicketStatus = async (req, res) => {
  const ticket = await Ticket.findOne({
    _id: req.params.id,
    assignedTo: req.user.id,
  });

  console.log("ticket", ticket);
  if (!ticket) return res.status(404).send("Ticket not found or unauthorized.");

  console.log("req.body", req.body);
  ticket.status = req.body.status;
  await ticket.save();

  // ✅ If resolved => close GitHub issue
  if (req.body.status === "Resolved" && ticket.githubIssueUrl) {
    await closeGitHubIssue(ticket.githubIssueUrl);
  }

  res.redirect("/assigned");
};

exports.viewSingleAssignedTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      assignedTo: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not assigned to you" });
    }
    const replies = await Reply.find({ ticket: ticket._id }).populate(
      "user",
      "name roles"
    );

    res.render("agent-ticket-details", { ticket, replies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
