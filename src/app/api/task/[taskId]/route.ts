import { NextRequest, NextResponse } from "next/server";
import { dbData } from "@/helper/db";
import { Task } from "@/models/task";

await dbData();

export async function GET(request:NextRequest,{params}:any){

    console.log(params)
    let {taskId} = params;
    try{
       let  findTask = await Task.findById({
        _id:taskId
       });
       console.log("Task Finded");
       return NextResponse.json({
        findTask:findTask
       })
    }catch(err){
        console.log("Task Not Find", err)
        return NextResponse.json({
            message:"Task Not Find",

        },{
            status:404
        })
    }
}

export async  function PUT(request:NextRequest, {params}:any){
    console.log(params)
    let {title,content,status} = await request.json();
    let {taskId} = params;

    try{
        let updateTask = await Task.findById({
            _id:taskId
        })

        updateTask.title = title;
        updateTask.content = content;
        updateTask.status = status;

        let update = await updateTask.save();
        return NextResponse.json({
            updateTask:update
        })
    }catch(err){
        console.log("Task Not Update",err)
        return NextResponse.json({
            message:"User Not Update"
        },{
            status:500
        })
    }
}

export async function DELETE(request:NextRequest,{params}:any){
    let {taskId} = params;
    try{
        let deleteUser = await Task.deleteOne({
            _id:taskId
        })

        return NextResponse.json({
            message: "Task Delete"
        })
    }catch(err){
        console.log("Task Not Delete");
        return NextResponse.json({
            message:"Task Not Delete"
        },{
            status:500
        })
    }
}