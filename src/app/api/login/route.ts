import { dbData } from "@/helper/db";
import { Users } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


await dbData();

export async function POST(request:NextRequest){

    let {email, password} = await request.json()

    try {

        // 1. Get user
        let user = await Users.findOne({
            email:email
        })

        if(user == null){
            throw new Error("User Not Found")
            return;
        }

        // 2. password matched
        const matchedPassword = bcrypt.compareSync(password, user.password);
        if(!matchedPassword){
            throw new Error("Password Not Matched")
            return;

        }

        // 3. Generate Token
        const token = jwt.sign({
            _id:user._id,
            name: user.name
        },"aaaaaaaaaa")

        console.log(token)

        // 4. Generate Response for cockies
        console.log(user)
       let response = NextResponse.json({
            message:"Login Success",
            success:true,
            user:user
        },{
            status:200
        })


        let authToken = "authToken"
        
        response.cookies.set("authToken", token, {
            expires: new Date(Date.now() + 86400000), // 1 day from now
            httpOnly: false
          });
          

        return response;
        
    } catch (error:any) {

        console.log("Error....", error)
        return NextResponse.json({
            message: error.message
        },{
            status:500
        })
    }
}