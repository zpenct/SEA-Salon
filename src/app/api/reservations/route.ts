import prisma from "../../../../prisma/prisma";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "../../../../auth";

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    include: {
      reservated_by: {
        select: {
          full_name: true,
          phone_number: true,
        },
      },
      reservated_in: {
        select: {
          name: true,
          location: true,
        },
      },
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

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth();

  const {
    type,
    branch,
    order_date,
    start_time,
    end_time,
    full_name,
    phone_number,
  } = await req.json();

  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 },
    );
  }

  const selectedBranch = await prisma.branch.findUnique({
    where: {
      name: branch,
    },
  });

  if (!selectedBranch) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "Branch Not Register yet" }),
      { status: 404 },
    );
  }

  const newReservation = await prisma.reservation.create({
    data: {
      service: type,
      order_date: order_date,
      start_time,
      end_time,
      user_id: Number(session.user.id),
      branch_id: Number(selectedBranch.id),
    },
    include: {
      reservated_by: true,
      reservated_in: true,
    },
  });
  return new NextResponse(
    JSON.stringify({
      data: newReservation,
      status: "success",
      message: "Reservation Created successfully",
    }),
    { status: 201 },
  );
}

// {
//     "type": "HAIRCUTS_STYLING",
//     "branch": "SEA_SALON_UTAMA",
//     "order_date": "2024-06-30T18:01:08+08:00",
//     "order_time": [
//         "19:30",
//         "20:30"
//     ],
//     "start_time": "19:30",
//     "end_time": "20:30",
//     "full_name": "John Doe",
//     "phone_number": "08898943"
// }
