import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const UserSchema = new Schema({
    name:
    {
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    about:{
        type:String,
        require:true
    }
})

export const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);