const express = require("express");
const router = express.Router();

const {createTicketForm,createTicket,myTickets,viewSingleTickets} = require("../controllers/ticketController");
const {auth} = require("../middleware/authMiddleware");

router.get("/create",auth,createTicketForm);
router.post("/create",auth,createTicket);

router.get("/my-tickets",auth,myTickets);
router.get("/my-tickets/:id",auth,viewSingleTickets);

module.exports = router;