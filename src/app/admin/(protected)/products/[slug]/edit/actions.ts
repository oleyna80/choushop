"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/require-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { productUpdateSchema } from "@/lib/validation/product";
import { updateProduct } from "@/server/services/catalog";

type State = { error?: string; fieldErrors?: Record<string, string[]> };

export async function updateProductAction(
  slug: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  await requireAdmin();

  const rl = checkRateLimit("admin:update-product");
  if (!rl.allowed) {
    return { error: "Rate limit exceeded. Wait 1 minute before updating." };
  }

  const raw = Object.fromEntries(formData.entries());

  function has(key: string) {
    return Object.prototype.hasOwnProperty.call(raw, key);
  }

  function str(key: string): string | undefined {
    const v = raw[key];
    if (typeof v !== "string") return undefined;
    const t = v.trim();
    return t || undefined;
  }

  function num(key: string): number | undefined {
    const v = raw[key];
    if (typeof v !== "string" || v === "") return undefined;
    const n = Number(v);
    return isNaN(n) ? undefined : n;
  }

  function numOrNull(key: string): number | null | undefined {
    const v = raw[key];
    if (typeof v !== "string") return undefined;
    if (v === "") return null;
    const n = Number(v);
    return isNaN(n) ? undefined : n;
  }

  const parsed = productUpdateSchema.safeParse({
    slug: str("slug"),
    title: str("title"),
    shortDescription: str("shortDescription"),
    description: str("description"),
    type: str("type"),
    theme: has("theme") ? str("theme") ?? null : undefined,
    price: num("price"),
    compareAtPrice: has("compareAtPrice") ? numOrNull("compareAtPrice") : undefined,
    status: str("status"),
    featured: raw.featured === "on",
    stock: has("stock") ? num("stock") ?? 0 : undefined,
    sku: has("sku") ? str("sku") ?? null : undefined,
    weight: has("weight") ? numOrNull("weight") : undefined,
    images: str("imageUrl")
      ? [{ url: str("imageUrl")!, alt: str("title") || slug }]
      : undefined,
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const result = await updateProduct(slug, parsed.data);
  if (result === null) {
    return { error: "Failed to update product. Please try again." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}
