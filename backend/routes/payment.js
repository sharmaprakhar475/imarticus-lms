const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware"); // your auth middleware
const paymentController = require("../controllers/payment");

router.post("/create-order", auth, paymentController.createOrder);
router.post("/verify", auth, paymentController.verifyPayment);

module.exports = router;
