import { z } from "zod";

export const productCreateSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  shortDescription: z.string().min(2),
  description: z.string().min(2),
  type: z.enum(["FIXED_BOX", "THEME_BOX", "LIMITED_BOX"]),
  theme: z.string().optional(),
  price: z.number().int().min(0),
  compareAtPrice: z.number().int().min(0).optional(),
  currency: z.literal("EUR").default("EUR"),
  taxRate: z.number().int().min(0).default(2000),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  stock: z.number().int().min(0).default(0),
  sku: z.string().optional(),
  weight: z.number().int().min(0).optional(),
  images: z
    .array(z.object({ url: z.string().url(), alt: z.string() }))
    .default([]),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = productCreateSchema.partial();

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
