"use client"
import React, { Suspense, useContext } from 'react'
import { specificTask } from '../services/http'
import Loading from '../loading'
import UsersContext from '@/context/userContext'
import { FaTrash } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Task = ({task,deleteTaskParent}:any ) => {

  let {user}:any = useContext(UsersContext);
  console.log(user)


  async function deleteTask(taskId:any){
       deleteTaskParent(taskId);
    
  }


  console.log("task", task)
  return (

    <Suspense fallback={<p>Loading...</p>}>
        <div className={` shadow-lg flex flex-col gap-5 rounded-lg mb-5`}>
            <div className={`${task.status == 'completed' ? 'bor' : "redBor"} p-5 mt-4 rounded-lg`}>
                <div className='flex justify-between'>
                  <h1 className='text-white text-2xl font-bold hed'>{task.title}</h1>
                  
                  <AlertDialog>
                      <AlertDialogTrigger><FaTrash className='text-white cursor-pointer transition-all hover:text-rose-600'/></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                              Your Task Delete Parmanently
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={()=>{deleteTask(task._id)}}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>



               
                </div>
                <p className='font-normal text-gray-200'>
                  {task.content}
                </p>
                <div className='flex justify-between'>
               
                <p className=' text-green-200'>Status : <span className={`${task.status == 'completed' ? 'text-green-600' : 'text-red-600'}`}>{task.status}</span></p>

                <p className='text-right text-green-200'>
                Author : <span className='font-bold'>{user.name}</span></p>
                </div>
            </div>
        </div>
    </Suspense>
  )
}

export default Task