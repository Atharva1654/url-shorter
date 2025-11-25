import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.route.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// app.get("/", (req, res) => {
//   res.send("Server is running successfully!");
// });

app.use("/api/url", urlRoutes);
app.use("/", redirectRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});
