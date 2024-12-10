import { httpaxios } from "@/helper/httpaxios"

export const signupData = async (data:any)=>{
    const result = await httpaxios.post('/api/user',data);
    return result.data
}


export const loginUserData = async (loginData:any)=>{
    const result = await httpaxios.post('/api/login', loginData);
    return result.data
}

export const logOut = async ()=>{
    const result = await httpaxios.post('/api/logout');
    return result.data
}