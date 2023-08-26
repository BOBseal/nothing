import React from 'react'
import Image from "next/image"
// import { groundMobile,ground2Mobile, treeBgMobile, bushesBgMobile, treeMobile, hillBgMobile } from '@/assets'
import MobileBg from "../MobileBg"
import { ChartInfo, Chart } from "@/components"
import { useBadgerContext } from '@/Context'


const DisplayChart = () => {
  const {handlerCard,selectCard, setCardSelected } = useBadgerContext();

  
  return (<>
    {selectCard &&<section className='min-w-screen lg:w-screen top-[10rem] z-[50] -mt-[50px]'>
            {/* <div className='relative top-0'>
                   <Image 
                          src={treeBgMobile} 
                          width={100} 
                          height={100} 
                          className='lg:hidden block object-contain w-full h-[270px] absolute top-[30px] left-[15px]' 
                    />
                  <Image 
                        src={bushesBgMobile} 
                        width={100} 
                        height={100} 
                        className='lg:hidden block object-contain w-full h-[120px] absolute top-[170px] left-[15px]' 
                        />
                    <Image 
                      src={treeMobile} 
                      width={100} height={100} 
                      className='lg:hidden block object-contain w-full absolute md:top-[-120px] top-[-10px] sm:top-[-30px] min-h-[200px] z-[3]' 
                    />
                    <Image 
                        src={hillBgMobile} width={100} 
                        height={100} className='lg:hidden block object-contain w-full absolute sm:top-[130px] top-[180px] min-h-[200px]' 
                      /> 
                    <Image 
                      src={groundMobile} 
                      width={100} height={100} 
                      className='object-contain lg:hidden block w-full min-h-[100px] absolute sm:top-[340px] top-[270px]' 
                      /> 
                    <Image 
                      src={ground2Mobile} 
                      width={100} height={100} 
                      className='object-contain lg:hidden block w-full min-h-[100px] absolute sm:top-[340px] top-[520px]' 
                    /> 
            </div>  */}
                
            <div className='w-full min-h-[80%] flex flex-wrap items-center gap-[20px] relative mt-[100px] md:top-[100px] top-[10px] justify-center z-[4] '>
               <Chart styles="lg:h-[500px] md:h-[400px] h-[400px] md:w-[600px] w-[400px] md:flex " />
               <ChartInfo props={()=> handlerCard()} className=''/>
            </div>
        {/* </div> */}
    </section>}
    </>
  )
}

export default DisplayChart