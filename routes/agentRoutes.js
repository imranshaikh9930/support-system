const express = require("express");
const router = express.Router();

const {auth,isAgent} = require("../middleware/authMiddleware");
const {viewAssignedTickets,updateTicketStatus} = require("../controllers/agentController");
const { viewSingleAssignedTicket } = require("../controllers/agentController");


router.get("/assigned",auth,isAgent("agent"),viewAssignedTickets);


router.post(
  '/ticket/:id/status',
  auth,
  isAgent('agent'),
  updateTicketStatus
);

router.get("/ticket/:id",auth,isAgent("agent"),viewSingleAssignedTicket)

module.exports = router;