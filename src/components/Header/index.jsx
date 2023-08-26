"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Links, CustomButton } from "@/components"
import { headerLogo } from '@/assets'
import { BiMenu } from "react-icons/bi"
import { MdClose } from "react-icons/md"
import { AnimatePresence, motion } from 'framer-motion'
import Link from "next/link"
import { navlinks, restLinks } from "@/constants"
import { useBadgerContext } from '@/Context'

const Header = () => {
     const { connectWallet ,user , guestUser, isGuestUser, isLogged , isMenuOpen , setIsMenuOpen } = useBadgerContext()

  return (
    <header className='md:min-h-[131px] h-[90px] sticky top-0 right-0 z-[50] w-screen flex flex-col justify-end' >
      <div className='md:min-h-[131px] h-[90px] w-screen absolute top-0 -z-[9] border-r-[6px] border-r-[#91181D] border-b-[6px] border-b-[#91181D] flex'>
      <Image src='/Header.svg' layout='fill' className='w-screen object-cover md:min-h-[131px] h-[90px]'/>
      </div>
       <nav className='flex flex-row justify-between h-full mt-[40px] items-center w-screen mx-aut p-8'>
          <Link href="/" className="cursor-pointer md:w-[212.5px] md:h-[63.75px] md:mr-[20px] bigBtn-bg bg-contain bg-no-repeat">
            <h3 
               className='flex md:px-[10px] w-full h-full px-[5px] md:py-[5px] py-[2px] rounded-[10px] items-center gap-[19px] lg:gap-[25px] font-bold font-chibold '>
               <Image 
                  src={headerLogo} width={30} 
                  height={30} className='object-contain w-[42.5px] h-[42.5px]'
                  alt="header-image"
                  />
               <span className='font-jumhoria font-bold text-main md:text-[18px] text-[16px] uppercase'> Badger </span>
            </h3>
          </Link>
          <aside className='lg:flex hidden flex-row items-center gap-[20px] font-chibold'>
            <Links 
               styles="flex-row items-center gap-[10px]" 
               links={navlinks}
               restLinks={restLinks} 
               linkStyle="bg-white text-black border-[2px] border-[#252c32] min-w-[149px] text-center uppercase text-main tracking-wider" 
               />
          </aside>

          <BiMenu 
               className="lg:hidden inline-block text-secondary font-bold text-[30px] cursor-pointer" 
               onClick={() => setIsMenuOpen(true)}      
            />

         {/* MOBILE NAV */}
         <AnimatePresence>
            { isMenuOpen && (
               <motion.aside
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                   className='lg:hidden h-full w-full fixed top-0 right-0 bg-[#252C32] z-[50] header-mobile bg-cover bg-[right_opx,bottom_0px] bg-no-repeat'>


                   <div className='flex relative h-full w-full flex-col items-center gap-[20px]'>

                     <div className='flex flex-row items-center w-full justify-between mb-[30px] p-[20px] z-[4]'>
                         <h3 
                           className='flex md:px-[10px] md:w-[212.5px] md:h-[63.75px] px-[5px] md:py-[5px] py-[2px] rounded-[10px] items-center justify-center gap-[5px] link-gradient border-[3px] border-main font-bold font-chibold bg-white'>
                           <Image 
                              src={headerLogo} width={30} 
                              height={30} className='object-contain w-[42.5px] h-[42.5px]'
                              alt="header-image"
                              />
                           <span className='font-jumhoria font-bold text-main md:text-[18px] text-[16px] uppercase'> Badger </span>
                         </h3>
                        <MdClose 
                           className="lg:hidden block text-secondary font-bold md:text-[50px] text-[40px] cursor-pointer" 
                           onClick={() => setIsMenuOpen(false)}      
                        />
                  </div>
                  <Links 
                     styles="flex-col items-center h-[80%] gap-[30px] z-[4]" 
                     linkStyle="w-[200px] link-gradient text-main uppercase tracking-wider"
                     restLinks={restLinks} 
                     links={navlinks}
                     setIsOpen={setIsMenuOpen} 
                     />
                  <div className='absolute flex flex-col items-center gap-[20px] h-full w-full top-0'>
                     <div className='mobile-header w-full bg-repeat absolute top-0 h-full' />
                  </div>
                  </div>
               </motion.aside>
            ) }
         </AnimatePresence>
       </nav>
    </header>
  )
}

export default Header