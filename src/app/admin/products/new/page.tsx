"use client";

import { useActionState } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { productCreateSchema } from "@/lib/validation/product";
import { createProduct } from "@/server/services/catalog";

type State = { error?: string; fieldErrors?: Record<string, string[]> };

async function createProductAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  "use server";

  const session = await auth();
  if (!session) return { error: "Unauthorized. Please log in." };

  const rl = checkRateLimit("admin:create-product");
  if (!rl.allowed) {
    return { error: "Rate limit exceeded. Wait 1 minute before creating another product." };
  }

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
    images: raw.imageUrl
      ? [{ url: raw.imageUrl as string, alt: raw.title as string }]
      : [],
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  await createProduct(parsed.data);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export default function NewProductPage() {
  const [state, action, pending] = useActionState(createProductAction, {});

  return (
    <div>
      <h1 className="text-4xl font-black">New Product</h1>
      <form action={action} className="mt-8 grid max-w-xl gap-6">
        {state.error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {state.error}
          </div>
        )}
        <Field
          error={state.fieldErrors?.slug?.[0]}
          label="Slug"
          name="slug"
          required
        />
        <Field
          error={state.fieldErrors?.title?.[0]}
          label="Title"
          name="title"
          required
        />
        <Field
          error={state.fieldErrors?.shortDescription?.[0]}
          label="Short Description"
          name="shortDescription"
          required
        />
        <Field
          error={state.fieldErrors?.description?.[0]}
          label="Description"
          name="description"
          type="textarea"
          required
        />
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
        <Field error={state.fieldErrors?.theme?.[0]} label="Theme" name="theme" />
        <Field
          error={state.fieldErrors?.price?.[0]}
          label="Price (centimes)"
          name="price"
          type="number"
          required
        />
        <Field
          error={state.fieldErrors?.compareAtPrice?.[0]}
          label="Compare At Price (centimes)"
          name="compareAtPrice"
          type="number"
        />
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
        <Field
          error={state.fieldErrors?.stock?.[0]}
          label="Stock"
          name="stock"
          type="number"
        />
        <Field error={state.fieldErrors?.sku?.[0]} label="SKU" name="sku" />
        <Field
          error={state.fieldErrors?.weight?.[0]}
          label="Weight (g)"
          name="weight"
          type="number"
        />
        <Field
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
          {pending ? "Creating..." : "Create Product"}
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
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
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
      {error && <span className="text-red-600">{error}</span>}
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
