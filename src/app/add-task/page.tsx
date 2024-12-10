"use client";
import Image from "next/image";
import { useState } from "react";
import { addTask } from "../services/http";
import { toast } from "sonner"


const Addtask = () => {

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId: "" 
  });

  const handleTaskData = async (event:any) => {
    event.preventDefault();
    console.log(task);


    if(task.title.trim() === '' && task.status.trim() === '' && task.content.trim() === ''){
      toast.warning("All feild is required")
      return;
  }

    if(task.title.trim() === ''){
        toast.warning("title is required")
        return;
    }
    if(task.status.trim() === ''){
        toast.warning("status is required")
        return;
    }
    if(task.content.trim() === ''){
        toast.warning("content is required")
        return;
    }

    try {
      const result = await addTask(task);
      console.log(result);

      toast.success("your task addes",{
        position:"top-left"
      })
      // Optionally reset form here after successful submission

      setTask({
        title: "",
        content: "",
        status: "none", // Reset status to empty string
        userId: ""
      });
  
    } catch (err) {
      console.log("Err.....", err);
      toast.error("Your Task is not Added",{
        position:"top-center"
      })
    }
  };

  const handleClear = (event:any) => {
    event.preventDefault();
    setTask({
      title: "",
      content: "",
      status: "none", // Reset status to empty string
      userId: ""
    });
  };

  return (
    <div className='bg-black pb-10 h-[100%] relative text-white flex flex-col items-center pt-10'>
      <Image src="/log.svg" width={300} height={100} className="mb-10" alt="Logo" />

      <div className='z-10'>
        <div className='flex justify-center'>
          <h1 className='text-4xl mb-10'>ADD TASK HERE !!</h1>
        </div>

        <form action="#!" onSubmit={handleTaskData}>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center items-center'>
              <label htmlFor="task_title" className='text-2xl mx-4'></label>
              <input 
                type="text" 
                id='task_title' 
                placeholder='Enter Your Title' 
                className='bg-gray-800 p-2 pl-4 rounded-full w-[425px]' 
                name="task_title" 
                onChange={(e) => {
                  setTask({ ...task, title: e.target.value });
                }}
                value={task.title}
              />
            </div>

            <div className='mt-4 ml-6'>
              <textarea 
                cols={45} 
                rows={10} 
                className='bg-gray-800 rounded-md px-6 pt-2 box-border' 
                placeholder='Enter Your Content' 
                onChange={(e) => {
                  setTask({ ...task, content: e.target.value });
                }}
                value={task.content}
              ></textarea>
            </div>

            <div>
              <select 
                id="task_status" 
                className='bg-gray-800 text-white w-[425px] p-2 rounded-lg ml-6'
                onChange={(e) => {
                  setTask({ ...task, status: e.target.value });
                }}
                value={task.status}
              >
                <option value="none" disabled>--select--</option> {/* Empty option to make it default */}
                <option value="pending">pending</option>
                <option value="completed">completed</option>
              </select>
            </div>

            <div className='mt-5 flex gap-5'>
              <button className='bg-blue-600 w-[100px] p-2 rounded-lg'>
                Add Task
              </button>

              <button 
                className='bg-red-600 w-[100px] p-2 rounded-lg'
                onClick={handleClear} // Call clear on click
              >
                Clear
              </button>
            </div>
          </div>
        </form>

        {/* You can conditionally show task data for debugging */}
      </div>
    </div>
  );
}

export default Addtask;
