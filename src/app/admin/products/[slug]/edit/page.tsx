import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { productUpdateSchema } from "@/lib/validation/product";
import { getProductBySlug, updateProduct } from "@/server/services/catalog";

async function updateProductAction(slug: string, formData: FormData) {
  "use server";

  const raw = Object.fromEntries(formData.entries());
  const parsed = productUpdateSchema.safeParse({
    slug: raw.slug || undefined,
    title: raw.title || undefined,
    shortDescription: raw.shortDescription || undefined,
    description: raw.description || undefined,
    type: raw.type || undefined,
    theme: raw.theme || undefined,
    price: raw.price ? Number(raw.price) : undefined,
    compareAtPrice: raw.compareAtPrice ? Number(raw.compareAtPrice) : undefined,
    status: raw.status || undefined,
    featured: raw.hasOwnProperty("featured") ? raw.featured === "on" : undefined,
    stock: raw.hasOwnProperty("stock") ? Number(raw.stock) || 0 : undefined,
    sku: raw.sku || undefined,
    weight: raw.weight ? Number(raw.weight) : undefined,
    images: raw.imageUrl
      ? [{ url: raw.imageUrl as string, alt: (raw.title as string) || slug }]
      : undefined,
  });

  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.flatten());
    return;
  }

  await updateProduct(slug, parsed.data);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-4xl font-black">Edit: {product.title}</h1>
      <form
        action={updateProductAction.bind(null, slug)}
        className="mt-8 grid max-w-xl gap-6"
      >
        <Field defaultValue={product.slug} label="Slug" name="slug" required />
        <Field
          defaultValue={product.title}
          label="Title"
          name="title"
          required
        />
        <Field
          defaultValue={product.shortDescription}
          label="Short Description"
          name="shortDescription"
          required
        />
        <Field
          defaultValue={product.description}
          label="Description"
          name="description"
          type="textarea"
          required
        />
        <Select
          defaultValue={product.type}
          label="Type"
          name="type"
          options={[
            ["FIXED_BOX", "Fixed Box"],
            ["THEME_BOX", "Theme Box"],
            ["LIMITED_BOX", "Limited Box"],
          ]}
          required
        />
        <Field
          defaultValue={product.theme ?? ""}
          label="Theme"
          name="theme"
        />
        <Field
          defaultValue={String(product.price)}
          label="Price (centimes)"
          name="price"
          type="number"
          required
        />
        <Field
          defaultValue={
            product.compareAtPrice ? String(product.compareAtPrice) : ""
          }
          label="Compare At Price (centimes)"
          name="compareAtPrice"
          type="number"
        />
        <Select
          defaultValue={product.status}
          label="Status"
          name="status"
          options={[
            ["DRAFT", "Draft"],
            ["ACTIVE", "Active"],
            ["ARCHIVED", "Archived"],
          ]}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            defaultChecked={product.featured}
            name="featured"
            type="checkbox"
          />{" "}
          Featured
        </label>
        <Field
          defaultValue={String(product.stock)}
          label="Stock"
          name="stock"
          type="number"
        />
        <Field defaultValue={product.sku ?? ""} label="SKU" name="sku" />
        <Field
          defaultValue={product.weight ? String(product.weight) : ""}
          label="Weight (g)"
          name="weight"
          type="number"
        />
        <Field
          defaultValue={product.images[0]?.url ?? ""}
          label="Image URL"
          name="imageUrl"
          type="url"
        />
        <button
          className="inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--foreground)] px-6 py-2.5 text-sm font-semibold text-white"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      {type === "textarea" ? (
        <textarea
          className="rounded-md border border-[var(--line)] p-3 text-sm"
          defaultValue={defaultValue}
          name={name}
          required={required}
          rows={4}
        />
      ) : (
        <input
          className="rounded-md border border-[var(--line)] p-2.5 text-sm"
          defaultValue={defaultValue}
          name={name}
          required={required}
          type={type}
        />
      )}
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  options: [string, string][];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      <select
        className="rounded-md border border-[var(--line)] p-2.5 text-sm"
        defaultValue={defaultValue}
        name={name}
        required={required}
      >
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
