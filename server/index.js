const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // ✅ ADD THIS
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const healthCheckRoutes = require("./routes/healthCheck");
const errorHandler = require("./middlewares/errorHandler");

dbConnect();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS Middleware — IMPORTANT
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tasko-anisul29.netlify.app"], // your frontend URL or Postman if using it
    credentials: true, // 🔥 this allows cookies to be included in requests
  })
);
app.use(helmet());

// Built-in Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/health", healthCheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/auth", taskRoutes);
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
