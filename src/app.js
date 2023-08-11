const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const connectDB = require("./config/db");

const userRoutes = require("./routes/users");
const ticketRoutes = require("./routes/tickets");
const eventRoutes = require("./routes/events");

const errorHandler = require("./middlewares/errorHandler");
const rateLimit = require("./config/rateLimit");

const PORT = process.env.PORT || 3000;
require("dotenv").config();

connectDB();

app.use(morgan("dev"));
app.use(rateLimit);
app.use(helmet());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);
app.use("/events", eventRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, Ticketmaster!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
