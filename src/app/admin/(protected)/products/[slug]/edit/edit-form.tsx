"use client";

import { useActionState } from "react";
import { updateProductAction } from "./actions";

type State = { error?: string; fieldErrors?: Record<string, string[]> };

interface Product {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  type: string;
  theme?: string | null;
  price: number;
  compareAtPrice?: number | null;
  status: string;
  featured: boolean;
  stock: number;
  sku?: string | null;
  weight?: number | null;
  images: { url: string; alt: string }[];
}

export function EditForm({ product, slug }: { product: Product; slug: string }) {
  const [state, action, pending] = useActionState(
    updateProductAction.bind(null, slug),
    {} as State
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
          product.compareAtPrice != null ? String(product.compareAtPrice) : ""
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
        defaultValue={product.weight != null ? String(product.weight) : ""}
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
