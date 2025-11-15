const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { signup, login, getUser } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/getUser/:id", getUser);
module.exports = router;
