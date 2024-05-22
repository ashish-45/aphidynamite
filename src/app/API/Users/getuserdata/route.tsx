import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log("User", user);
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}
