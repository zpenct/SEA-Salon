import prisma from "../../../../prisma/prisma";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "../../../../auth";

export async function GET() {
  const branches = await prisma.branch.findMany({
    include: {
      services: true,
    },
  });
  return NextResponse.json({
    items: branches,
    status: "success",
    message: "Branches Loaded",
  });
}

type TService = {
  service: string;
  session_time: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth();

  const { open_time, close_time, branch_name, location, services } =
    await req.json();

  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 },
    );
  }

  if (session.user.role != "ADMIN") {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not An Admin" }),
      { status: 401 },
    );
  }

  const newBranch = await prisma.branch.create({
    data: {
      open_time,
      close_time,
      name: branch_name,
      location,
      services: {
        create: services.map((service: TService) => ({
          name: service.service,
          session: Number(service.session_time),
        })),
      },
    },
  });
  return new NextResponse(
    JSON.stringify({
      data: newBranch,
      status: "success",
      message: "Branches Created successfully",
    }),
    { status: 201 },
  );
}
