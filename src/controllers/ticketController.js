const mongoose = require("mongoose");
const logger = require("../config/logger");
const Event = require("../models/event");
const Order = require("../models/order");
const { processPayment } = require("../services/paymentService");
const { callWithCircuitBreaker } = require("../services/circuitBreaker");

const purchaseTicket = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Evento não encontrado");
    }

    const userId = req.userData.userId;
    const { quantity, cardInfo } = req.body;

    if (event.ticketsAvailable < quantity) {
      return res
        .status(400)
        .json({ message: "Ingressos indisponíveis na quantidade solicitada." });
    }

    const ticketPrice = event.ticketPrice;
    const totalAmount = ticketPrice * quantity;

    const paymentResult = callWithCircuitBreaker(
      processPayment,
      cardInfo,
      totalAmount
    );

    if (!paymentResult.success) {
      return res.status(400).json({ message: paymentResult.message });
    }

    const order = new Order({
      userId: userId,
      eventId: eventId,
      quantity: quantity,
      totalAmount: totalAmount,
      status: "active",
    });

    await order.save({ session });
    event.ticketsAvailable -= quantity;
    await event.save({ session });

    await session.commitTransaction();
    res
      .status(200)
      .json({ message: "Ingressos comprados com sucesso!", order });
  } catch (error) {
    await session.abortTransaction();
    logger.error(error);
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

const checkAvailability = async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  if (event) {
    res.json({ ticketsAvailable: event.ticketsAvailable });
  } else {
    res.status(404).json({ message: "Evento não encontrado." });
  }
};

module.exports = { purchaseTicket, checkAvailability };
