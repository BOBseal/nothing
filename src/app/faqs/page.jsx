"use client"
import {Contents, MobileBg} from "@/components"

const Faqs = () => {

  return (
    <section className='min-w-screen min-h-screen profileBg-desktop bg-no-repeat bg-cover bg-[right_0px_bottom_0px] flex justify-center items-center'>
          {/* this is the background for mobile  */}
      <div className=" h-screen w-full fixed top-0 right-0 bg-[#252C32] -z-[9] header-mobile bg-cover bg-[right_opx,bottom_0px] bg-no-repeat"/>
         <div>
         <Contents
            aboutPage={true}
            title="FAQs"
            text="
            1: What Is BadgerScan ? 
            Answer: It Is a Token Scanning Tool on Ethereum for Badger Token Holders to Find Tokens
            
            "
         />
         </div>
    </section>
  )
}

export default Faqs