const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const agentRoutes = require("./routes/agentRoutes");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");

const errorHandler = require("./middleware/errorHandler");

const morgan = require("morgan");

app.use(morgan("dev"));

const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());
app.use(cors());    


dotenv.config();
connectDB();
app.use(express.json());

//agent

app.use("/agent", agentRoutes);

//user
app.use("/user", userRoutes);

//shop
app.use("/shop", shopRoutes);





// test

// app.post("/debug", (req, res) => {
//   console.log("BODY:", req.body);
//   res.json({ body: req.body });
// });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "404 NOT FOUND"
  });
});

app.use(errorHandler);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅SERVER STARTED AT ${PORT}`);
});