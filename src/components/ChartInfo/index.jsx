import React from 'react'
import Image from "next/image"
import CustomButton from '../CustomButton'
import { badgerLogo } from '@/assets'
import { useBadgerContext } from '@/Context'


const ChartInfo = ({props}) => {
  const {selectCard , setCardSelected} = useBadgerContext()
  
  return (
    <aside className={`md:w-[500px] mt-[90px] md:-mt-0 sm:w-[350px] ${!selectCard ? "hidden" : ""} w-[310px] md:flex flex-col gap-[15px] md:border-none border-[2px] rounded-[20px] border-main md:bg-none chart-info_gradient md:p-0 p-[20px]`}>
       <div className='flex md:flex-row items-start gap-[10px]'>
          <Image 
            src={badgerLogo} 
            height={100} 
            width={100}
            className='object-contain md:w-[110px] md:h-[110px] w-[80px] h-[80px] rounded-[50%] p-[5px]' 
            />
            <div className=''>
                <h2 className='md:text-[2.5rem] text-[20px] text-secondary font-bold font-chibold uppercase global-text_shadow text-stroke tracking-wide'> Badger </h2>
                <div className='flex flex-row gap-[10px] font-patrick'>
                   <p className='md:text-main text-secondary font-semibold md:text-[25px] text-[18px]'> 0000.00 </p>
                  <div className='flex items-start font-patrick'>
                    <p className='md:text-[16px] text-[14px] text-[#2EA46A]'> + 00.00 </p>
                    <p className='md:text-[16px] text-[14px] text-[#FF3434] ml-[10px]'> - 00.00 </p>
                  </div>
                </div> 
                <p className='font-medium text-main font-patrick'> last updated on july 23, 2023 </p>
            </div>
       </div> 

       <div className='flex flex-col md:items-start items-center md:gap-[60px] gap-[20px]'>
           <div>
                <h2 className='text-[2.5rem] md:block hidden text-secondary font-bold uppercase global-text_shadow font-chibold text-stroke tracking-wide'> Description </h2>
                <p className='font-normal md:text-[16px] text-[14px] text-main font-patrick'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p> 
            </div>

            <div className='flex flex-col md:flex-row justify-center md:justify-evenly w-full pr-6 pl-6 items-center gap-2'>
            <CustomButton 
              title="Add To Favorites" 
              styles="btn-gradient text-secondary font-semibold uppercase border-[4px] border-main w-[fit-content] h-[fit-content] md:max-w-[fit-content] font-chibold text-stroke " 
              />
            
            <CustomButton 
              title="Close" 
              styles="btn-gradient text-secondary font-semibold uppercase border-[4px] border-main w-[fit-content] h-[fit-content] md:max-w-[fit-content] font-chibold text-stroke" 
              handleClick={props}
              />
            </div>
            
            
       </div>
    </aside>
  )
}

export default ChartInfo