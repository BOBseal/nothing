"use client"
import React,{useEffect} from 'react'
import Image from "next/image"
import ProfileDetails from "../ProfileDetails"
import { avatar, leftArrow, rightArrow  } from '@/assets'
import {CustomButton, ChartCarousel, MobileBg, InputForm} from '@/components'
import { useBadgerContext } from '@/Context'
import ResultsCard from '../Cards/resultsCard'

const baseImgUrl = 'http://localhost:8000/uploads'

const Profile = () => {
  const {userInfo, user, connectWallet , allCoinSparkLineData , currentPage} = useBadgerContext()

useEffect(() => {
  if(!user){
    connectWallet()
  }
}, [user])


  return (
    <section className='w-full h-full profileBg-desktop bg-no-repeat bg-cover bg-[right_0px_bottom_0px] md:mt-[-5px]'>
          {/* this is the background for mobile  */}
      <div className=" h-screen w-full fixed top-0 right-0 bg-[#252C32] -z-[9] header-mobile bg-cover bg-[right_opx,bottom_0px] bg-no-repeat"/>

            <div className='relative w-[90%] mx-auto md:top-[160px] top-[120px] flex lg:flex-row flex-col lg:gap-0 gap-[20px] items-center justify-evenly z-[3]'>
                <aside className='flex lg:flex-row flex-col items-center gap-[10px] justify-between'>
                    <Image 
                          src={`${baseImgUrl}/${userInfo?.image}` ?? avatar} 
                          width={50} 
                          height={50} 
                          className='object-cover md:w-[178px] w-[100px] h-[100px] md:h-[196px] rounded-[50%]'   
                        />
                      <div className='flex flex-col items-center'>
                          <h3 className='md:text-[2rem] text-[18px] font-semibold text-secondary global-text_shadow font-chibold'> { userInfo?.username ?? "Guest" }  </h3>
                          <p className='md:text-[1.5rem] text-[16px] font-medium font-patrick text-main'> { user.slice(1,5)  ?? "Bagder Guest" } ...{user.slice(36)} </p>
                      </div>
                   </aside>

                   <ProfileDetails />
            </div>

            
            <div className='mt-[230px]'>
              <InputForm user={user} />
            </div>

             <div className='flex flex-col items-center gap-[20px] w-full justify-center p-[15px]'>

                <div className='flex flex-col w-10/12 items-start gap-[20px] z-[2]'>
                    <h3 className='md:text-[2rem] text-[18px] text-secondary font-semibold ml-[40px] font-patrick'> Favorites : </h3>

                    <div className="flex w-full md:flex-row items-center gap-[10px]">
                        <Image 
                        src={leftArrow} 
                        width={30} 
                        height={30} 
                        alt="left-arrow"
                        className="object-contain md:inline-block cursor-pointer hidden" 
                        />
                        
                        <div className='flex md:h-[650px] w-full items-center border flex-col md:flex-row'>
                         <ResultsCard data={allCoinSparkLineData}/>
                        </div>

                        <Image 
                        src={rightArrow} 
                        width={30} 
                        height={30} 
                        alt="left-arrow"
                        className="object-contain md:inline-block cursor-pointer hidden" 
                        />
                   </div>
                </div>
                
                <div className='flex justify-between md:justify-center w-10/12'>
                <Image 
                        src={leftArrow} 
                        width={30} 
                        height={30} 
                        alt="left-arrow"
                        className="object-contain inline-block cursor-pointer md:hidden" 
                        />
                <CustomButton title="Logout" styles="md:w-[143px] md:h-[52px] text-secondary font-medium uppercase border-[4px] border-main btn-logout_gradient text-main" />
                
                <Image 
                        src={rightArrow} 
                        width={30} 
                        height={30} 
                        alt="left-arrow"
                        className="object-contain inline-block cursor-pointer md:hidden" 
                        />
                </div>
             </div>
    </section>
  )
}

export default Profile


  {/* <div className='relative top-[0px]'>
                    <Image 
                            src={treeBgMobile} 
                            width={100} 
                            height={100} 
                            className='lg:hidden block object-contain w-full h-[270px] absolute top-[30px] right-[-110px] left-[-5px]' 
                            />
                    <Image 
                            src={bushesBgMobile} 
                            width={100} 
                            height={100} 
                            className='lg:hidden block object-contain w-full h-[270px] absolute top-[30px] right-[-110px] left-[-5px]' 
                        />
                    <Image 
                        src={treeMobile} 
                        width={100} height={100} 
                        className='lg:hidden block object-contain w-full absolute md:top-[-120px] top-[-10px] sm:top-[-30px] min-h-[200px] z-[3]' 
                    />
                    <Image 
                        src={hillBgMobile} width={100} 
                        height={100} className='lg:hidden block object-contain w-full absolute sm:top-[130px] top-[190px] min-h-[200px]' 
                    /> 
                    <Image 
                    src={groundMobile} 
                    width={100} height={100} 
                    className='object-contain lg:hidden block w-full min-h-[100px] absolute sm:top-[340px] top-[260px]' 
                    /> 
                    <Image 
                    src={ground2Mobile} 
                    width={100} height={100} 
                    className='object-contain lg:hidden block w-full min-h-[100px] absolute sm:top-[340px] top-[470px]' 
                    /> 
            </div> */}