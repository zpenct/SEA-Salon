import prisma from "../../../../../../prisma/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { email: string } },
) {
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  return NextResponse.json({
    data: user,
    status: "success",
    message: "User found",
  });
}
