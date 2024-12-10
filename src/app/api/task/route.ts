import { Task } from "@/models/task"
import { dbData } from "@/helper/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { Users } from "@/models/user"; // Import the Users model

await dbData();

export async function GET() {
    try {
        // Find all tasks
        let findTask = await Task.find();
        return NextResponse.json({
            tasksFind: findTask
        });
    } catch (err) {
        console.log("Error fetching tasks:", err);
        return NextResponse.json({
            message: "Task Not GET"
        }, {
            status: 404
        });
    }
}

export async function POST(request: NextRequest) {
    let { title, content, status, userId } = await request.json();


    let token:any = request.cookies.get("authToken")?.value;
    let data: any = jwt.verify(token, process.env.JWT_SECRET || "aaaaaaaaaa");

    if (!token) {
        return NextResponse.json({
            message: "Authentication token is missing."
        }, {
            status: 401
        });
    }

    try {

        

        // Create a new task using the provided data
        let createTask = new Task({
            title,
            content,
            status,
            userId: data._id // Use the user _id from the decoded token instead of the provided userId
        });

        // Save the task to the database
        await createTask.save();

        return NextResponse.json({
            task_Create: createTask
        }, {
            status: 200
        });

    } catch (err) {
        // Handle errors related to JWT verification or task creation
        console.log("Error creating task:", err);
        return NextResponse.json({
            message: "Task Not Created"
        }, {
            status: 500
        });
    }
}
