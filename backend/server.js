const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require("./middlewares/errorMiddleware")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler)


app.use("/api/goals", require("./routes/goalRoutes"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
