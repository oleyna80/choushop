import { z } from "zod";

export const productCreateSchema = z.object({
  slug: z.string().min(2).max(200),
  title: z.string().min(2).max(255),
  shortDescription: z.string().min(2).max(500),
  description: z.string().min(2).max(10000),
  type: z.enum(["FIXED_BOX", "THEME_BOX", "LIMITED_BOX"]),
  theme: z.string().max(100).optional(),
  price: z.number().int().min(0).max(999999),
  compareAtPrice: z.number().int().min(0).max(999999).optional(),
  currency: z.literal("EUR").default("EUR"),
  taxRate: z.number().int().min(0).default(2000),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  stock: z.number().int().min(0).max(99999).default(0),
  sku: z.string().max(100).optional(),
  weight: z.number().int().min(0).max(999999).optional(),
  images: z
    .array(z.object({ url: z.string().url(), alt: z.string().min(1) }))
    .default([]),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = productCreateSchema.partial();

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
