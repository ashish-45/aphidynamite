import { connect } from "@/DBConfig/DBConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ err: "User Not Found" }, { status: 400 });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return NextResponse.json(
        { err: "{Password do not Matched" },
        { status: 400 }
      );
    }

    //   Create Token Data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    };

    //   create Token

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "2d",
    });

    // create Resonse

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    // set Cookies

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
