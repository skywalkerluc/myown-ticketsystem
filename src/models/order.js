const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, default: "active" },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
