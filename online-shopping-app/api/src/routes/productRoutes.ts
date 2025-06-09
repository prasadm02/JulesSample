import { Router, Request, Response } from "express";

// Mock product data
const products = [
  { id: "1", name: "Laptop Pro", price: 1200.99, description: "High-performance laptop for professionals.", category: "Electronics", stock: 15 },
  { id: "2", name: "Wireless Mouse", price: 25.50, description: "Ergonomic wireless mouse.", category: "Accessories", stock: 150 },
  { id: "3", name: "Mechanical Keyboard", price: 75.00, description: "RGB Mechanical Keyboard with blue switches.", category: "Accessories", stock: 75 },
  { id: "4", name: "4K Monitor", price: 300.75, description: "27-inch 4K UHD Monitor.", category: "Electronics", stock: 30 },
  { id: "5", name: "USB-C Hub", price: 39.99, description: "7-in-1 USB-C Hub for Mac and Windows.", category: "Accessories", stock: 200 },
  { id: "6", name: "Webcam HD", price: 49.99, description: "1080p HD Webcam with microphone.", category: "Electronics", stock: 60 }
];

const router = Router();

// GET /api/products - Get all products
router.get("/", (req: Request, res: Response) => {
  res.json(products);
});

// GET /api/products/:id - Get a single product by ID
router.get("/:id", (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
