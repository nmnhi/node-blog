import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.route.js";
import storageRoutes from "./routes/storage.routes.js";

const app = express();

// middlewares
app.use(express.json());
// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-frontend-two-gamma.vercel.app/"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/storage", storageRoutes);

export default app;
