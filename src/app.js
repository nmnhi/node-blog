import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);

export default app;
