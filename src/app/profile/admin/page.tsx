"use client"
import Loading from '@/app/loading'
import React, { Suspense, useEffect, useState } from 'react'

const page = () => {

    let [load, setLoad] = useState("")
    let [loading, setLoading] = useState<any>()

    useEffect(()=>{
        setTimeout(()=>{
            setLoad("Loading")
        },1000)
    },[])
        
    function dataLoading(){
        <Loading/>
    }

        


  return (

    <div>
        <h1>{load || <Loading/>}</h1>
    </div>
 
  )

}

export default page