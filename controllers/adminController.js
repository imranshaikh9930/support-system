const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const { closeGitHubIssue } = require("../utils/githubApi");

exports.getAllTickets = async (req, res) => {
  const tickets = await Ticket.find().populate(
    "customer assignedTo",
    "name roles"
  );
  const agents = await User.find({ roles: "agent" });

  res.render("admin-tickets", { tickets, agents });
};

exports.assignTicket = async (req, res) => {
  const ticketId = req.params.id;
  const agentId = req.body.agentId;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    return res.status(404).send("Ticket not found");
  }

  ticket.assignedTo = agentId;

  await ticket.save();

  res.redirect("/admin/tickets");
};

exports.getAdminDashboard = async (req, res) => {
  const open = await Ticket.countDocuments({ status: "Open" });

  const inProgress = await Ticket.countDocuments({ status: "In Progress" });

  const resolved = await Ticket.countDocuments({ status: "Resolved" });

  const bug = await Ticket.countDocuments({ category: "Bug" });

  const feature = await Ticket.countDocuments({ category: "Feature" });

  const general = await Ticket.countDocuments({ category: "General" });

  res.render("admin-dashboard", {
    stats: {
      open,
      inProgress,
      resolved,
      bug,
      feature,
      general,
    },
  });
};

exports.closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).send("Ticket not found");

    ticket.status = "Resolved";
    await ticket.save();

    if (ticket.githubIssueUrl) {
      await closeGitHubIssue(ticket.githubIssueUrl); // 🔁 Sync GitHub
    }

    res.redirect("/admin/tickets");
  } catch (err) {
    res.status(500).send("Error closing ticket: " + err.message);
  }
};
