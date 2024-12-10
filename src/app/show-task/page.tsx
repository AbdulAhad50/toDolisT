"use client"
import React, { Suspense, useEffect, useState } from 'react'

import ShowTask from './showTask'
import Loading from '../loading'

const showTaskPage = () => {

  let [data , setData] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
        setData(true)
    },3000)
  },[data])
  
  
  return (

    
        <div className='bg-black'>
            {data? <ShowTask/> : <Loading/>}
        </div>

    
  )
}

export default showTaskPage