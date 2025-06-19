const Reply = require("../models/replyModel");

exports.postReply = async (req, res) => {
  try {
    const { message } = req.body;

    // console.log("message", message);

    const ticketId = req.params.id;

    const reply = new Reply({
      message,
      ticket: ticketId,
      user: req.user.id,
    });

    await reply.save();

    // Redirect to correct page depending on role
    if (req.user.roles === "agent") {
      res.redirect(`/ticket/${ticketId}`);
    } else {
      res.redirect(`/ticket/my-tickets/${ticketId}`);
    }
  } catch (err) {
    res.status(500).send("Error posting reply: " + err.message);
  }
};
