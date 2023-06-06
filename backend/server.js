const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const {errorHandler} = require("./middlewares/errorMiddleware")
const {connectDB} = require("./config/db")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();//connecting to database

app.use("/api/goals", require("./routes/goalRoutes"));// API routes for "/api/goals" root
app.use("/api/users", require("./routes/userRoutes"));// API routes for "/api/user" root


app.use(errorHandler)// Built-in error handler
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
