"use client"; // This marks the component as a Client Component

import React, { useEffect, useState } from "react";
// No need for Link here unless you are linking to other places from the detail page

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category?: string; // Optional fields based on mock data
  stock?: number;   // Optional fields based on mock data
}

// The props for this page will include params with an id
export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = params; // Extract id from params

  useEffect(() => {
    if (!id) return; // Don\'t fetch if id is not available yet

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]); // Effect depends on the product id

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    // This case might be redundant if error handles 404, but good for robustness
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Description:</strong> {product.description}</p>
      {product.category && <p><strong>Category:</strong> {product.category}</p>}
      {product.stock !== undefined && <p><strong>Stock:</strong> {product.stock} units</p>}
      {/* Add more product details here as needed */}
    </div>
  );
}
