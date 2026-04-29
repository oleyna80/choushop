import { z } from "zod";

export const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(20)
});

export const checkoutAddressSchema = z.object({
  line1: z.string().min(2),
  line2: z.string().optional(),
  postalCode: z.string().min(3),
  city: z.string().min(2),
  country: z.string().length(2)
});

export const checkoutSessionSchema = z.object({
  cartId: z.string().min(8),
  items: z.array(checkoutItemSchema).min(1),
  customer: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    phone: z.string().optional()
  }),
  shippingAddress: checkoutAddressSchema,
  shippingMethodId: z.string().min(1),
  termsAccepted: z.literal(true),
  termsVersion: z.string().min(1)
});

export type CheckoutSessionInput = z.infer<typeof checkoutSessionSchema>;
