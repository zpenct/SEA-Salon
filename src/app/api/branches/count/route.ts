import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET() {
  const total = await prisma.branch.count();
  return NextResponse.json({
    data: total,
    status: "success",
    message: "Total Loaded",
  });
}
