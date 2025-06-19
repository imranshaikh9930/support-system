const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/authMiddleware");
const {postReply} = require("../controllers/replyController")

router.post("/:id",auth,postReply);
module.exports = router;