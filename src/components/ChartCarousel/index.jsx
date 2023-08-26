import { dummyChart } from "@/assets"
import Image from "next/image"

const ChartCarousel = ({ styles }) => {
  return (
    <div className={`${styles} w-[90%] mx-auto md:border-[5px] md:border-main rounded-[15px] carousel-gadient p-[10px] flex md:flex-row flex-col gap-[20px] justify-center items-center z-[4]`}>
        <Image 
          src={dummyChart} 
          width={100} height={100} 
          className="object-contain md:w-[350px] md:h-[350px] w-[300px] h-[130px]" 
          />  
        <Image 
          src={dummyChart} 
          width={100} height={100} 
          className="object-contain md:w-[350px] md:h-[350px] w-[300px] h-[130px]" 
          />  
        <Image 
          src={dummyChart} 
          width={100} height={100} 
          className="object-contain md:w-[350px] md:h-[350px] w-[300px] h-[130px]" 
          />  
    </div>
  )
}

export default ChartCarousel