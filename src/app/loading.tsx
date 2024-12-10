"use client"
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  // Simulate a loading process (like fetching data)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10; // Increment progress by 10
        } else {
          clearInterval(interval); // Stop the interval when progress reaches 100
          return 100;
        }
      });
    }, 500); // Update every 500ms

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="loading-container w-[100%] h-[100vh] pt-32  justify-center items-center">
      <Progress value={progress} max={100} className="w-[50%] mx-[auto]"/>
    </div>
  );
};

export default Loading;
