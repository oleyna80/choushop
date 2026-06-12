import { NextResponse } from "next/server";

import { getAllProducts } from "@/server/services/catalog";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ products });
}
