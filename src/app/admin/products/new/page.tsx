import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { productCreateSchema } from "@/lib/validation/product";
import { createProduct } from "@/server/services/catalog";

async function createProductAction(formData: FormData) {
  "use server";

  const raw = Object.fromEntries(formData.entries());
  const parsed = productCreateSchema.safeParse({
    slug: raw.slug,
    title: raw.title,
    shortDescription: raw.shortDescription,
    description: raw.description,
    type: raw.type,
    theme: raw.theme || undefined,
    price: Number(raw.price),
    compareAtPrice: raw.compareAtPrice ? Number(raw.compareAtPrice) : undefined,
    status: raw.status,
    featured: raw.featured === "on",
    stock: Number(raw.stock) || 0,
    sku: raw.sku || undefined,
    weight: raw.weight ? Number(raw.weight) : undefined,
    images: raw.imageUrl ? [{ url: raw.imageUrl as string, alt: raw.title as string }] : [],
  });

  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.flatten());
    return;
  }

  await createProduct(parsed.data);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-4xl font-black">New Product</h1>
      <form action={createProductAction} className="mt-8 grid max-w-xl gap-6">
        <Field label="Slug" name="slug" required />
        <Field label="Title" name="title" required />
        <Field label="Short Description" name="shortDescription" required />
        <Field label="Description" name="description" type="textarea" required />
        <Select
          label="Type"
          name="type"
          options={[
            ["FIXED_BOX", "Fixed Box"],
            ["THEME_BOX", "Theme Box"],
            ["LIMITED_BOX", "Limited Box"],
          ]}
          required
        />
        <Field label="Theme" name="theme" />
        <Field label="Price (centimes)" name="price" type="number" required />
        <Field label="Compare At Price (centimes)" name="compareAtPrice" type="number" />
        <Select
          label="Status"
          name="status"
          options={[
            ["DRAFT", "Draft"],
            ["ACTIVE", "Active"],
            ["ARCHIVED", "Archived"],
          ]}
        />
        <label className="flex items-center gap-2 text-sm">
          <input name="featured" type="checkbox" /> Featured
        </label>
        <Field label="Stock" name="stock" type="number" />
        <Field label="SKU" name="sku" />
        <Field label="Weight (g)" name="weight" type="number" />
        <Field label="Image URL" name="imageUrl" type="url" />
        <button
          className="inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--foreground)] px-6 py-2.5 text-sm font-semibold text-white"
          type="submit"
        >
          Create Product
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      {type === "textarea" ? (
        <textarea
          className="rounded-md border border-[var(--line)] p-3 text-sm"
          name={name}
          required={required}
          rows={4}
        />
      ) : (
        <input
          className="rounded-md border border-[var(--line)] p-2.5 text-sm"
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
}: {
  label: string;
  name: string;
  options: [string, string][];
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      <select
        className="rounded-md border border-[var(--line)] p-2.5 text-sm"
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
