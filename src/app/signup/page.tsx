"use client"

import { useState } from "react"
import { toast } from "sonner"
import { signupData } from "../services/httpsignup"


function SignUp() {
    let [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        about:""
    })

    async function datahandel(e:any){

        e.preventDefault();

        if(data.name.trim() === '' && data.email.trim() === '' && data.password.trim() === '' && data.about.trim() === ''){
            toast.warning("All feild is required")
            return;
        }
      
          if(data.name.trim() === ''){
              toast.warning("name is required")
              return;
          }
          if(data.email.trim() === ''){
              toast.warning("email is required")
              return;
          }
          if(data.password.trim() === ''){
              toast.warning("password is required")
              return;
          }
          if(data.about.trim() === ''){
              toast.warning("about is required")
              return;
          }

          try{
            const res = await signupData(data);
            toast.success("Successfully Registered")
            console.log(res)

            setData({
                name:"",
                email:"",
                password:"",
                about:""
            })
          }catch(err){
                toast.error("You cant Registered")
          }
    }

  return (
    <div className='bg-slate-800 flex flex-col justify-center items-center w-[100%] h-[700px] pb-12'>
        <div>
            <h1 className='text-4xl mt-24 mb-8 font-bold text-teal-500'>SIGNUP HERE</h1>
        </div>

        <div>
            <form action="#!" className='flex flex-col gap-8' onSubmit={datahandel}>
                <input type="text" name='data_name' id='data_name' className='bg-slate-600 text-white  h-[40px] w-[500px] rounded-full pl-10 font-bold' placeholder='Enter Your Name' onChange={(e)=>{
                    setData({
                        ...data,
                        name:e.target.value
                    })
                }}
                value={data.name}
                />
                <input type="email" name='data_email' id='data_email' className='bg-slate-600 text-white  h-[40px] rounded-full pl-10 font-bold' placeholder='Enter Your Email' onChange={(e)=>{
                    setData({
                        ...data,
                        email:e.target.value
                    })
                }}
                value={data.email}
                />

                <input type="password" name='data_password' id='data_password' className='bg-slate-600  text-white rounded-full h-[40px] pl-10 font-bold' placeholder='Enter Your Password' onChange={(e)=>{
                    setData({
                        ...data,
                        password:e.target.value
                    })
                }}
                value={data.password}
                />

                <textarea placeholder='Enter About Your Self' name="data_about" id="data_about" cols={30} rows={10} className='rounded-lg bg-slate-600 pl-10 pt-2 font-bold text-white'
                onChange={(e)=>{
                    setData({
                        ...data,
                        about:e.target.value
                    })
                }}
                value={data.about}
                ></textarea>

                <div className='text-center'>
                    < button type='submit' className='w-[120px] bg-blue-500 text-center h-[30px] rounded-full'>SIGNUP</button>
                </div>

            </form>


        </div>
    </div>
  )
}

export default SignUp
