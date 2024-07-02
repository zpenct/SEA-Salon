import prisma from "../../../../../prisma/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { email: string } },
) {
  const reservations = await prisma.reservation.findMany({
    where: {
      reservated_by: {
        email: params.email,
      },
    },
    include: {
      reservated_in: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return NextResponse.json({
    items: reservations,
    status: "success",
    message: "Reservations Loaded",
  });
}
