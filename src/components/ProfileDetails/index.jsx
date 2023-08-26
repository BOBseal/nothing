import { badgerBalanceLogo } from "@/assets"
import Image from "next/image"

const paraphStyles = "lg:text-[16px] text-[14px] text-main font-medium uppercase"

const ProfileDetails = () => {
  return (
    <div 
        className="flex md:flex-row flex-col items-center justify-between profile-details-gradient gap-[10px] border-[3px] border-main rounded-[20px] p-[20px] md:h-[239px] md:w-[635px] sm:w-[400px] w-[350px]">

        <div 
          className="flex flex-row items-center justify-center gap-[10px]">
           <Image src={badgerBalanceLogo} width={50} height={50} 
              className="object-contain md:w-[83px] md:h-[83px] "
             />
             <div className="flex flex-col items-end gap-[10px]">
                <h2 className='lg:text-[25px] md:text-[20px] text-[18px] text-secondary font-bold uppercase global-text_shadow font-chibold'> Balances </h2>
                <div>
                  <p className={`${paraphStyles} font-patrick`}> 0000000.00 BADGER TOKENS </p>
                  <p className={`${paraphStyles} font-patrick`}> 0000000.00 BADGER TOKENS </p>
                </div>
             </div>
        </div>

        <div className="md:h-full h-[3px] md:w-[3px] w-full bg-main" />

        <div className="flex flex-col  md:w-[200px] gap-[10px]">
            <h2 className='lg:text-[25px] md:text-[20px] text-[18px] text-secondary font-bold uppercase global-text_shadow font-chibold'> Tier Info </h2>
            <p className={`${paraphStyles} lowercase font-patrick  w-full h-full text-left break-all`}> Includes all the favorites and customizable charts, ncludes all the favorites and customizable charts,  </p>
        </div>
    </div>
  )
}

export default ProfileDetails