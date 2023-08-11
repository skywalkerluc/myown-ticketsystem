const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth");
const ticketController = require("../controllers/ticketController");

router.post(
  "/purchase/:eventId",
  authenticate,
  ticketController.purchaseTicket
);

router.get(
  "/availability/:eventId",
  authenticate,
  ticketController.checkAvailability
);

module.exports = router;
