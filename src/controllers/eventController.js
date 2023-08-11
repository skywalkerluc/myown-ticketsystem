const Event = require("../models/event");

const list = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

module.exports = { list };
