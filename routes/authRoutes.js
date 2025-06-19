const express = require("express");
const authController = require("../controllers/authController");
const { auth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/register",authController.showRegister);
router.post("/register",authController.register);

router.get("/login",authController.showLogin);
router.post("/login",authController.login);


router.post("/logout",authController.logout);

router.get('/admin/data', auth, isAdmin, (req, res) => {
  res.send('This is admin data');
});

module.exports = router;
