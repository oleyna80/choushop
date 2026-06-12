"use client";

import { useActionState } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { checkRateLimit } from "@/lib/rate-limit";
import { productUpdateSchema } from "@/lib/validation/product";
import { getProductBySlug, updateProduct } from "@/server/services/catalog";

type State = { error?: string; fieldErrors?: Record<string, string[]> };

async function updateProductAction(
  slug: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  "use server";

  const rl = checkRateLimit("admin:update-product");
  if (!rl.allowed) {
    return { error: "Rate limit exceeded. Wait 1 minute before updating." };
  }

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
    return { fieldErrors: parsed.error.flatten().fieldErrors };
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

function EditForm({
  product,
  slug,
}: {
  product: Awaited<ReturnType<typeof getProductBySlug>> & {};
  slug: string;
}) {
  const [state, action, pending] = useActionState(
    updateProductAction.bind(null, slug),
    {}
  );

  return (
    <form action={action} className="mt-8 grid max-w-xl gap-6">
      {state.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <Field
        defaultValue={product.slug}
        error={state.fieldErrors?.slug?.[0]}
        label="Slug"
        name="slug"
        required
      />
      <Field
        defaultValue={product.title}
        error={state.fieldErrors?.title?.[0]}
        label="Title"
        name="title"
        required
      />
      <Field
        defaultValue={product.shortDescription}
        error={state.fieldErrors?.shortDescription?.[0]}
        label="Short Description"
        name="shortDescription"
        required
      />
      <Field
        defaultValue={product.description}
        error={state.fieldErrors?.description?.[0]}
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
        error={state.fieldErrors?.theme?.[0]}
        label="Theme"
        name="theme"
      />
      <Field
        defaultValue={String(product.price)}
        error={state.fieldErrors?.price?.[0]}
        label="Price (centimes)"
        name="price"
        type="number"
        required
      />
      <Field
        defaultValue={
          product.compareAtPrice ? String(product.compareAtPrice) : ""
        }
        error={state.fieldErrors?.compareAtPrice?.[0]}
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
        error={state.fieldErrors?.stock?.[0]}
        label="Stock"
        name="stock"
        type="number"
      />
      <Field
        defaultValue={product.sku ?? ""}
        error={state.fieldErrors?.sku?.[0]}
        label="SKU"
        name="sku"
      />
      <Field
        defaultValue={product.weight ? String(product.weight) : ""}
        error={state.fieldErrors?.weight?.[0]}
        label="Weight (g)"
        name="weight"
        type="number"
      />
      <Field
        defaultValue={product.images[0]?.url ?? ""}
        error={state.fieldErrors?.images?.[0]}
        label="Image URL"
        name="imageUrl"
        type="url"
      />
      <button
        className="inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--foreground)] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
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
      {error && <span className="text-red-600">{error}</span>}
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
