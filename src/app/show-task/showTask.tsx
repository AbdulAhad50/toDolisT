"use client"

import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, specificTask } from '../services/http'
import UsersContext from '@/context/userContext'
import Task from './Task'
import { toast } from 'sonner'

const ShowTask = () => {
    let [task, setTasks] = useState<any[]>([]) // Initial state as an empty array
    let context: any = useContext(UsersContext)

    async function loadTask(userId: string) {
        try {
            const tasks: any = await specificTask(userId)
            setTasks([tasks.tasksFind[0].reverse()])

        } catch (error) {
            console.log('Error fetching tasks:', error)
        }
    }

    useEffect(() => {
        if (context.user) {
            loadTask(context.user._id) // Load tasks for the logged-in user
        }
    }, [context.user, task])

    console.log("show", task[0])

    async function taskDelete(taskId: any) {
        try {
            let result = await deleteTask(taskId);
            console.log("result", result);
            toast.success('Task Deleted');

            let newTask = task.filter(item => item != taskId);
            console.log("Task Data", newTask)
            setTasks(newTask)
        } catch (err) {
            console.log(err);
            toast.error('Task Not delete')
        }
    }

    return (
        <div className='container grid grid-cols-12'>
            <div className='col-span-6 col-start-4'>
                <h1 className='text-3xl text-center text-white mt-4'>Your Task - {task[0]?.length}</h1>
                {
                    task[0]?.map((task: any, i: number) => (
                        <Task task={task} key={i} deleteTaskParent={taskDelete} />
                    ))
                }
            </div>
        </div>
    )
}

export default ShowTask