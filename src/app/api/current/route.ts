import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Users } from "@/models/user";

export async function GET(request: NextRequest) {
  // Retrieve the token from the cookies
  let token = request.cookies.get("authToken")?.value;
  console.log(token);

  // Check if token is missing
  if (!token) {
    return NextResponse.json({ error: "Token is missing" }, { status: 401 });
  }

  try {
    // Verify the token with the secret key stored in environment variables
    let data:any = jwt.verify(token, process.env.JWT_SECRET || "aaaaaaaaaa");
    console.log(data);

    // Find the user by ID and exclude the password from the result
    let user = await Users.findById(data._id).select("-password");

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(user);

    // Return the user data as response
    return NextResponse.json(user);
  } catch (error) {
    // Handle token verification errors (e.g., expired or invalid token)
    console.error(error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
