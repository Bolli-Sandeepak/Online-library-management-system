// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";

// Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

// MongoDB Connection
mongoose.connect(
  process.env.MONGO_URI, // ✅ FIXED here!
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log(" MONGODB CONNECTED"))
.catch((err) => console.error(" MONGODB CONNECTION FAILED:", err));

// Root route
app.get("/", (req, res) => {
  res.status(200).send(" Welcome to LibraryApp");
});

// Start server
app.listen(port, () => {
  console.log(" Server is running on PORT ${port}");
});
