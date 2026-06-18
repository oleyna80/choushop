"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/require-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { productCreateSchema } from "@/lib/validation/product";
import { createProduct } from "@/server/services/catalog";

type State = { error?: string; fieldErrors?: Record<string, string[]> };

export async function createProductAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  await requireAdmin();

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
