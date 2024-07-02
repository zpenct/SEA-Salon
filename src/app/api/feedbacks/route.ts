import prisma from "../../../../prisma/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json({
    data: reviews,
    status: "success",
    message: "Branches Loaded",
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { full_name, notes, rating } = await req.json();

  const newReservation = await prisma.review.create({
    data: {
      name: full_name,
      notes,
      points: rating,
    },
  });
  return new NextResponse(
    JSON.stringify({
      items: newReservation,
      status: "success",
      message: "Reservation Created successfully",
    }),
    { status: 201 },
  );
}
