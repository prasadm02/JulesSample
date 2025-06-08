export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Product Detail Page: {params.id}</h1>
    </div>
  );
}
