import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    let response = NextResponse.json({
        message:"Logout Successfully",
        success:true
    })

    response.cookies.set("authToken", "",{
        expires:new Date(0)
    })

    return response
}