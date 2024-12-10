import { dbData } from "@/helper/db";
import { Users } from "@/models/user";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

await dbData()

export async function GET(request:NextApiRequest){
    try{
        const allUser = await Users.find().select("-password")
        return NextResponse.json({
            All_User:allUser
        },{
            status:202
        })
    }catch(err){
        console.log("Users Not Found", err);
        return NextResponse.json({
            message:"User Not Found"
        },{
            status:404
        })
    }
}

export async function POST(request:NextRequest){
    let {name,email,password,about} = await request.json();
    try{
        const userCreate = new Users({
            name,
            email,
            password,
            about
        })

        userCreate.password = bcrypt.hashSync(userCreate.password, 10)

        await userCreate.save()

        return NextResponse.json({
            user_Create:userCreate
        },{
            status:200
        })
    }catch(err){
        console.log("User Not Created", err);
        return NextResponse.json({
            message:"User Not Created"
        },{
            status:500
        })
    }

}