import { NextResponse } from "next/server";
import { getAllCollections } from "@/server/services/collections";

export async function GET() {
  const collections = await getAllCollections();
  return NextResponse.json({ collections });
}
