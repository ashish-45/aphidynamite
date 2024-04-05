import { connect } from "@/DBConfig/DBConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, id } = reqBody;

    const updateUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    if (!updateUser) {
      return NextResponse.json({ error: "User Not found" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "User Update Successfully", user: updateUser },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
