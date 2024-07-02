import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
export const GET = async (
  req: NextRequest,
  context: { params: { name: string } },
) => {
  const branch = await prisma.branch.findUnique({
    where: {
      name: context.params.name,
    },
    include: {
      services: true,
    },
  });

  if (!branch) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "Branch not found" }),
      { status: 404 },
    );
  }

  return NextResponse.json({
    data: branch,
    status: "success",
    message: "Branch Loaded successfully",
  });
};
