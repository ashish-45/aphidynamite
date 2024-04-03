import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfull",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date() });
    return response;
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
