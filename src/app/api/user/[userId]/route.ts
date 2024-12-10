import { dbData } from "@/helper/db";
import { Users } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

await dbData();


export async function GET(request:NextRequest,{params}:any){
    console.log("params", params)
    let {userId} = params;

    try{
        let findUser = await Users.findById({
            _id:userId
        });
        return NextResponse.json({
            userFind: findUser
        },{
            status:202
        })
    }catch(err){
        console.log("User not Found");
        return NextResponse.json({
            message:"User Not Found",

        },{
            status:404
        })
    }
}


export async function PUT(request:NextRequest,{params}:any){

    let {name,password,about} = await request.json()
    let {userId} = params;
    try{
        let userUpdate = await Users.findById({
            _id:userId
        })

        userUpdate.name=name;
        userUpdate.password=password;
        userUpdate.about = about;

        let update = await userUpdate.save();
        return NextResponse.json({
            user_Update:update
        },{
            status:200
        })
    }catch(err){

        console.log("User Not Update", err)
        return NextResponse.json({
            message:"User Not Update"
        },{
            status:500
        })
    }
}

export async function DELETE(request:NextRequest,{params}:any){
    let {userId} = params;
    try{
        let deleteUser = await Users.deleteOne({
            _id:userId
        })

        console.log("User Deleted");
        return NextResponse.json({
            userDelete:deleteUser
        },{
            status:200
        })

    }catch(err){
        console.log("User Not Delete",err);
        return NextResponse.json({
            message: "User Not Delete"
        })
    }
}