const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const { connectDB } = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://goalsetter-h7ak.onrender.com",
      "https://goal-setter-bd0f9.web.app",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB(); //connecting to database

app.use("/api/goals", require("./routes/goalRoutes")); // API routes for "/api/goals" root
app.use("/api/users", require("./routes/userRoutes")); // API routes for "/api/user" root

//serve frontend when in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("set to production"));
}

app.use(errorHandler); // Built-in error handler
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
