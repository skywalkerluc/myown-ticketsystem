const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  ticketsAvailable: { type: Number, default: 0 },
  ticketPrice: { type: Number, required: true },
  image: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
