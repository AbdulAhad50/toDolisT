import Image from "next/image";
import { dbData } from "@/helper/db";
import { Suspense } from "react";
import Loading from "./loading";

await dbData();
export default function Home() {
  return (
<Suspense fallback={<Loading/>}>
  <div className="bg-gray-800 h-[100vh] flex justify-between pt-14 px-10">
      <div>
          <h1 className="text-white font-bold text-4xl tshadow">
              Add Your Task <b className="text-yellow-500">Here</b>
          </h1>
      </div>

      <div>
          <Image src='/hero-image.svg' alt="hero-image" width={350} height={0}/>
      </div>
   </div>
</Suspense>
  );
}
