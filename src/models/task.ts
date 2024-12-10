import mongoose, { mongo, Schema } from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    addedDate:{
        type:Date,
        required:true,
        default:Date.now
    },

    status:{
        type:String,
        enum : ["pending", "completed"],
        default: "pending"
    },

    userId:{
        type:String
    }

})


export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema)