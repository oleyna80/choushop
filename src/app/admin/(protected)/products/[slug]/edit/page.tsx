import { getProductBySlug } from "@/server/services/catalog";
import { EditForm } from "./edit-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div className="p-10">Product not found.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-black">Edit: {product.title}</h1>
      <EditForm product={product} slug={slug} />
    </div>
  );
}
