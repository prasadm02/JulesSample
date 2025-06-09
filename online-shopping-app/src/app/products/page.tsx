"use client"; // This marks the component as a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  // Add other fields if your mock data includes them and you want to display them
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Assuming the API server is running on port 3001 as per previous steps
        const response = await fetch("http://localhost:3001/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  return (
    <div>
      <h1>Product Listings</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <h2>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </h2>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
