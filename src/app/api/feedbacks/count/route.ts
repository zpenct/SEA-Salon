import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET() {
  const goodReviews = await prisma.review.count({
    where: {
      points: {
        gte: 3,
      },
    },
  });
  const badReviews = await prisma.review.count({
    where: {
      points: {
        lt: 3,
      },
    },
  });
  return NextResponse.json({
    data: {
      goodReviews,
      badReviews,
      totalReviews: goodReviews + badReviews,
    },
    status: "success",
    message: "Total Loaded",
  });
}
