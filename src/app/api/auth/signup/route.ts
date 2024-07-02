import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const { full_name, email, password, phone_number } = await req.json();

    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password: hashed_password,
        phone_number,
      },
    });

    return NextResponse.json({
      user: {
        name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "fail",
          message: "user with that email already exists",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
