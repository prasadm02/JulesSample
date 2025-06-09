import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes"; // <-- Import product routes

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes); // <-- Mount product routes

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", message: "Server is healthy" });
});

app.listen(port, () => {
  console.log(`[server]: API Server is running at http://localhost:${port}`);
});
