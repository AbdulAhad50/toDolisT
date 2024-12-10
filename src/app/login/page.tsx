"use client"
import { toast } from "sonner"
import { useContext, useState } from "react"
import { loginUserData } from "../services/httpsignup"
import { useRouter } from "next/navigation"
import UsersContext from "@/context/userContext"

function Login() {

  const route = useRouter()
  const context:any = useContext(UsersContext)


  let [loginData, setLoginData] = useState({
    email:"",
    password:""
  })

  const loginHandle = async (event:any)=>{

      event.preventDefault()

      if(loginData.email.trim() === '' && loginData.password.trim() === ''){
          toast.warning("all Fields are Required")
          return;
      }

      if(loginData.email.trim() === ''){
          toast.warning("Email is Required")
          return;
      }

      if(loginData.password.trim() === ''){
        toast.warning("Password is Required")
        return;
      }

      try{

        const data = await loginUserData(loginData)
        console.log(data)
        console.log("User Successfully Registered", data);
        toast.success("Logged In")
        context.setUser(data.user)
        route.push("/profile/user")
        // window.location.reload();
        setLoginData({
          email:"",
          password:""
        })
      }catch(err:any){
        console.log("Error", err);
        toast.error(err.response.data.message)
      }


  }

  return (
    <div className='bg-gray-800 w-[100%] text-white flex flex-col pt-11 items-center h-[100vh]'>
        <div>
            <h1 className='text-4xl mt-16 mb-8 font-bold text-teal-500'>Login</h1>
        </div>

        <div>
            <form action="#!" className='flex flex-col gap-4 mt-5' onSubmit={loginHandle}>
                <input type="email" name='data_email' id='data_email' className='bg-slate-600 text-white  w-[400px] h-[40px] rounded-full pl-10 font-bold' placeholder='Enter Your Email' onChange={(e)=>{
                  setLoginData({
                    ...loginData,
                    email:e.target.value
                  })
                }}
                value={loginData.email}
                />

                <input type="password" name='data_password' id='data_password' className='bg-slate-600  text-white rounded-full h-[40px] pl-10 font-bold' placeholder='Enter Your Password'
                onChange={(e)=>{
                  setLoginData({
                    ...loginData,
                    password:e.target.value
                  })
                }}
                value={loginData.password}
                />

                <div className='text-center mt-6'>
                <button type='submit' className='w-[120px] bg-blue-500 text-center h-[30px] rounded-full'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
