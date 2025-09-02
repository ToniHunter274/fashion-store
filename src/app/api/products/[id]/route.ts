import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  _req: Request,
  ctx: { params: Promise <{ id: string }> }
) {
  const { id } = await ctx.params;
  const num = Number(id);
  if (Number.isNaN(id)) {
    return NextResponse.json({error: "Bad id"}, {status: 400});
  }

  const product = await prisma.product.findUnique({ where: { id: num } });
  if(!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404});
  }

  return NextResponse.json(product);
}