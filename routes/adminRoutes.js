const express= require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middleware/authMiddleware");
const { getAdminDashboard, assignTicket, getAllTickets, closeTicket } = require("../controllers/adminController");

router.get("/tickets",auth,isAdmin("admin"),getAllTickets);
router.post("/assign/:id",auth,isAdmin("admin"),assignTicket);
router.get("/dashboard",auth,isAdmin("admin"),getAdminDashboard);

router.post("/close/:id",auth,isAdmin("admin"),closeTicket);



module.exports = router;