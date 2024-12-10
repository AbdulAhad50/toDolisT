import { httpaxios } from "@/helper/httpaxios";

export const addTask = async (data:any) =>{
    let result = await httpaxios.post("/api/task",data);
    return result.data
}

export const specificTask = async (userId:any)=>{
    let result = await httpaxios.get(`/api/user/${userId}/task`);
    return result.data
}
export const deleteTask = async (taskId:any)=>{
    let result = await httpaxios.delete(`/api/task/${taskId}`);
    return result.data
}